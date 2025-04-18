import ConfirmDialog from '@/Components/ConfirmDialog';
import CustomTooltip from '@/Components/CustomTooltip';
import FileUpload from '@/Components/FileUpload'
import { Button } from '@/Components/ui/button';
import { Slider } from '@/Components/ui/slider';
import { formatFileSize } from '@/utils/formatFileSize';
import { isAudioFile } from '@/utils/isAudioFile';
import showToast from '@/utils/showToast';
import { Head, router, useForm } from '@inertiajs/react';
import { Loader, Play, Pause, ArrowUpFromLine, Trash2, Scissors, Loader2 } from 'lucide-react'
import React, { Suspense, useState, useRef, useEffect } from 'react'

// Helper function to format time in MM:SS format
function formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

export default function Audio({event}: any) {
    const [dbAudio, setDbAudio] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [audioFile, setAudioFile] = useState<File | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    
    // Trimming state
    const [showTrimmer, setShowTrimmer] = useState(false);
    const [audioDuration, setAudioDuration] = useState(0);
    const [trimRange, setTrimRange] = useState<[number, number]>([0, 100]);
    const [originalAudioFile, setOriginalAudioFile] = useState<File | null>(null);

    useEffect(() => {
        if (event?.boomerang_setting?.add_audio_file) {
            setDbAudio(event?.boomerang_setting?.add_audio_file);
        }
    }, [event]);
    
    const handleFileSelect = (files: File[]) => {
        if (!isAudioFile(files[0])) { 
            showToast('error', 'Please select an audio file.', {position: 'bottom-right'});
            return;
        }

        // set audio file to null
        setAudioFile(null);
        setData('audioFile', null);
        
        if (files.length > 0) {
            const file = files[0];
            setAudioFile(file);
            setOriginalAudioFile(file); // Store original file for trimming
            setData('audioFile', file);
            const url = URL.createObjectURL(file);
            setAudioUrl(url);
            
            // Reset trimmer state
            setShowTrimmer(false);
            setTrimRange([0, 100]);
        }
    };

    const handleFileRemove = () => {
        if(dbAudio) {
            setDialogOpen(true);
        }
        setAudioFile(null);
        setOriginalAudioFile(null);
        setData('audioFile', null);
        setAudioUrl(null);
        setIsPlaying(false);
        setShowTrimmer(false);
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    };

    const togglePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                // If trimmer is active, set audio position to start of trim
                if (showTrimmer) {
                    const startSeconds = (trimRange[0] / 100) * audioDuration;
                    audioRef.current.currentTime = startSeconds;
                }
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleTrimmer = () => {
        if (!showTrimmer && audioRef.current) {
            // Set duration when opening trimmer
            setAudioDuration(audioRef.current.duration);
        }
        setShowTrimmer(!showTrimmer);
    };

    const handleTrimRangeChange = (values: number[]) => {
        setTrimRange([values[0], values[1]]);
        
        if (audioRef.current) {
            // Set audio position to start of trim
            const startSeconds = (values[0] / 100) * audioDuration;
            audioRef.current.currentTime = startSeconds;
        }
    };

    const [isApplyingTrim, setIsApplyingTrim] = useState(false);

    const handleTrimAudio = async () => {
        if (!originalAudioFile || !audioRef.current || !audioDuration) return;

        try {
            // Create audio context
            // @ts-ignore
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            setIsApplyingTrim(true);
            // Get file as array buffer
            const arrayBuffer = await originalAudioFile.arrayBuffer();
            const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
            
            // Calculate trim points
            const startPercentage = trimRange[0] / 100;
            const endPercentage = trimRange[1] / 100;
            
            const startSample = Math.floor(startPercentage * audioBuffer.length);
            const endSample = Math.floor(endPercentage * audioBuffer.length);
            const trimLength = endSample - startSample;
            
            // Create new buffer for trimmed audio
            const trimmedBuffer = audioContext.createBuffer(
                audioBuffer.numberOfChannels,
                trimLength,
                audioBuffer.sampleRate
            );
            
            // Copy the trimmed portion to the new buffer
            for (let channel = 0; channel < audioBuffer.numberOfChannels; channel++) {
                const channelData = audioBuffer.getChannelData(channel);
                const trimmedData = trimmedBuffer.getChannelData(channel);
                
                for (let i = 0; i < trimLength; i++) {
                    trimmedData[i] = channelData[startSample + i];
                }
            }
            
            // Convert AudioBuffer to WAV
            const wavBuffer = bufferToWave(trimmedBuffer, trimmedBuffer.length);
            
            // Create a new File object
            const trimmedFile = new File(
                [wavBuffer],
                originalAudioFile.name.replace(/\.[^/.]+$/, "") + "_trimmed.wav",
                { type: "audio/wav" }
            );
            
            // Update state with trimmed file
            setAudioFile(trimmedFile);
            setData('audioFile', trimmedFile);
            
            // Create URL for audio player
            const trimmedUrl = URL.createObjectURL(trimmedFile);
            setAudioUrl(trimmedUrl);
            setIsApplyingTrim(false);
            // Close trimmer
            setShowTrimmer(false);
            
            showToast('success', 'Audio trimmed successfully.', {position: 'bottom-right'});
        } catch (error) {
            setIsApplyingTrim(false);
            console.error('Error trimming audio:', error);
            showToast('error', 'Error trimming audio.', {position: 'bottom-right'});
        }
    };

    // Helper function to convert AudioBuffer to WAV format
    function bufferToWave(audioBuffer: AudioBuffer, len: number) {
        const numOfChan = audioBuffer.numberOfChannels;
        const length = len * numOfChan * 2 + 44;
        const buffer = new ArrayBuffer(length);
        const view = new DataView(buffer);
        const channels = [];
        let sample = 0;
        let offset = 0;
        let pos = 0;

        // Write WAVE header
        setUint32(0x46464952);                         // "RIFF"
        setUint32(length - 8);                         // file length - 8
        setUint32(0x45564157);                         // "WAVE"

        setUint32(0x20746d66);                         // "fmt " chunk
        setUint32(16);                                 // length = 16
        setUint16(1);                                  // PCM (uncompressed)
        setUint16(numOfChan);
        setUint32(audioBuffer.sampleRate);
        setUint32(audioBuffer.sampleRate * 2 * numOfChan); // avg. bytes/sec
        setUint16(numOfChan * 2);                      // block-align
        setUint16(16);                                 // 16-bit (hardcoded in this demo)

        setUint32(0x61746164);                         // "data" - chunk
        setUint32(length - pos - 4);                   // chunk length

        // Write interleaved data
        for (let i = 0; i < audioBuffer.numberOfChannels; i++) {
            channels.push(audioBuffer.getChannelData(i));
        }

        while (pos < length) {
            for (let i = 0; i < numOfChan; i++) {
                // interleave channels
                sample = Math.max(-1, Math.min(1, channels[i][offset])); // clamp
                sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767) | 0; // scale to 16-bit signed int
                view.setInt16(pos, sample, true); // write 16-bit sample
                pos += 2;
            }
            offset++; // next source sample
        }

        return buffer;

        function setUint16(data: number) {
            view.setUint16(pos, data, true);
            pos += 2;
        }

        function setUint32(data: number) {
            view.setUint32(pos, data, true);
            pos += 4;
        }
    }

    const { data, setData, post, progress, processing, errors } = useForm({
        audioFile: null as File | null,
    });

    function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        const formData = new FormData();
        if (data.audioFile) {
            formData.append('audioFile', data.audioFile);
        }
        post(route('event.update.audio', event.slug), {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                setAudioFile(null);
                setData('audioFile', null);
                showToast('success', 'Audio updated successfully.', {position: 'bottom-right'});
            },
            onError: () => {
                showToast('error', 'Something went wrong.', {position: 'bottom-right'});
            }
        });
    }

    const deleteDBFile = () => {
        router.delete(route('event.update.delete', event.slug), {
            preserveScroll: true,
            onSuccess: () => {
                showToast('success', 'Audio deleted successfully.', {position: 'bottom-right'});
            },
            onError: () => {
                showToast('error', 'Something went wrong.', {position: 'bottom-right'});
            }
        });
    }

    // Handle metadata loading, which gives us duration
    const handleMetadataLoaded = () => {
        if (audioRef.current) {
            setAudioDuration(audioRef.current.duration);
        }
    };
    
    // Add timeupdate event handler to constrain playback to trim range
    useEffect(() => {
        const audioElement = audioRef.current;
        
        const handleTimeUpdate = () => {
            if (showTrimmer && audioElement) {
                const endSeconds = (trimRange[1] / 100) * audioDuration;
                
                // If current playback position exceeds the trim end point, pause and reset to start point
                if (audioElement.currentTime >= endSeconds) {
                    audioElement.pause();
                    setIsPlaying(false);
                    // Return to start of trimmed section
                    const startSeconds = (trimRange[0] / 100) * audioDuration;
                    audioElement.currentTime = startSeconds;
                }
            }
        };
        
        if (audioElement) {
            audioElement.addEventListener('timeupdate', handleTimeUpdate);
        }
        
        return () => {
            if (audioElement) {
                audioElement.removeEventListener('timeupdate', handleTimeUpdate);
            }
        };
    }, [showTrimmer, trimRange, audioDuration]);

    
    return (
        <div className="space-y-4"> 
        <Head title="Gallery Audio" />
            <Suspense fallback={<Loader className="mx-auto" size={20} />}>
                <FileUpload
                    iconType='music'
                    dropzoneText="Drag and drop an audio file here or click to browse"
                    onFilesSelected={handleFileSelect}
                    onFileRemove={handleFileRemove}
                    multiple={false}
                    acceptedTypes={['audio/*']}
                    maxSize={30 * 1024 * 1024} // 30MB
                    showPreview={false} 
                />
            </Suspense>
           
            {(event?.boomerang_setting?.add_audio_file || audioFile) && (
                <div>
                    <ul className="list-none files-main-nav" id="files-main-nav">
                        <li>
                            <div className="flex items-center gap-2">
                                <button 
                                    onClick={togglePlayPause}
                                    className="me-0 hover:opacity-80 transition-opacity"
                                >
                                    <span className="avatar avatar-md bg-primary/10 !text-primary">
                                        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                                    </span>
                                </button>
                                <div className="flex-1">
                                    <span className="text-sm flex font-medium">
                                        {audioFile?.name || "Audio file"}
                                        {audioFile && (
                                            <>
                                                <CustomTooltip content="Trim Audio">
                                                    <span>
                                                        <Scissors 
                                                            onClick={toggleTrimmer} 
                                                            className='ml-2 text-primary cursor-pointer' 
                                                            size={16}
                                                        />
                                                    </span>
                                                </CustomTooltip>
                                            </>
                                        )} 
                                        <CustomTooltip content="Remove">
                                            <span>
                                                <Trash2 
                                                    onClick={handleFileRemove} 
                                                    className='ml-2 text-danger cursor-pointer' 
                                                    size={16}
                                                />
                                            </span>
                                        </CustomTooltip>
                                    </span>
                                </div>
                                <div className="ms-auto">
                                    {audioFile && (
                                        <span className="font-medium text-textmuted dark:text-textmuted/50">
                                            {formatFileSize(audioFile.size)}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </li>
                    </ul>
                    
                    {/* {showTrimmer && audioFile && ( */}
                        {showTrimmer &&audioFile && (
                        <div className="mt-4 p-4 border rounded-lg">
                            <h4 className="text-sm font-medium mb-2">Trim Audio</h4>
                            <div className="mb-4 relative">
                            <Slider
                                value={trimRange}
                                onValueChange={handleTrimRangeChange}
                                min={0}
                                max={100}
                                step={0.1}
                                className="my-4"
                            />
                            {/* Custom handles */}
                            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 pointer-events-none">
                                <div 
                                    className="absolute w-4 h-4 rounded-full bg-primary -translate-x-1/2 -translate-y-1/2"
                                    style={{ left: `${trimRange[0]}%` }}
                                />
                                <div 
                                    className="absolute w-4 h-4 rounded-full bg-primary -translate-x-1/2 -translate-y-1/2"
                                    style={{ left: `${trimRange[1]}%` }}
                                />
                            </div>
    
                            </div>

                            <div className="flex justify-between text-xs text-gray-500">
                                    <span>
                                        {audioDuration ? formatTime((trimRange[0] / 100) * audioDuration) : '0:00'}
                                    </span>
                                    <span>
                                        {audioDuration ? formatTime((trimRange[1] / 100) * audioDuration) : '0:00'}
                                    </span>
                                </div>
                            <div className="flex justify-end space-x-2">
                                <Button className='ti-btn'
                                    variant="outline" 
                                    size="sm" 
                                    onClick={() => setShowTrimmer(false)}
                                >
                                    Cancel
                                </Button>
                                <Button className='ti-btn bg-[linear-gradient(243deg,#ffcc00_0%,#ff9339_100%)] text-white'
                                    variant="default" 
                                    size="sm" 
                                    onClick={handleTrimAudio}
                                    disabled={processing}
                                >
                                    {isApplyingTrim ? <Loader2 className='mr-2 animate-spin'/> : null}
                                    Apply Trim
                                </Button>
                            </div>
                        </div>
                    )}
                    
                    <audio 
                        ref={audioRef}
                        src={dbAudio || audioUrl || undefined}
                        onEnded={() => setIsPlaying(false)}
                        onLoadedMetadata={handleMetadataLoaded}
                        className="hidden"
                    />
                    <Button 
                        onClick={handleSubmit}
                        disabled={!audioFile || processing} 
                        className="ti-btn bg-[linear-gradient(243deg,#ffcc00_0%,#ff9339_100%)] text-white w-full mt-4">
                        {!processing && <ArrowUpFromLine className="mr-2" />}
                        {processing && <Loader className='mr-2 animate-spin'/>}
                        Upload
                    </Button>
                </div>
            )}
            {progress && (<progress value={progress.percentage} max="100">{progress.percentage}%</progress>)}
            <Suspense fallback={""}>
                <ConfirmDialog 
                    message="Do you want to delete this audio from database ?"
                    dialogOpen={dialogOpen} 
                    setDialogOpen={setDialogOpen}
                    onContinue={deleteDBFile}
                />
            </Suspense>
        </div>
    )
}

