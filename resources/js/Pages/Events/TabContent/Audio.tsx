import CustomTooltip from '@/Components/CustomTooltip';
import FileUpload from '@/Components/FileUpload'
import { Button } from '@/components/ui/button';
import { Toaster } from '@/Components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
import { formatFileSize } from '@/utils/formatFileSize';
import { isAudioFile } from '@/utils/isAudioFile';
import { useForm, usePage } from '@inertiajs/react';
import { Loader, Play, Pause, ArrowUpFromLine, Trash2 } from 'lucide-react'
import React, { Suspense, useState, useRef, useEffect } from 'react'

export default function Audio({event}: any) {
    const { toast } = useToast();
    const filePath = usePage().props.filePath;
    const [dbAudio, setDbAudio] = useState(null);

    const [audioFile, setAudioFile] = useState<File | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

        useEffect(() => {
            if (event?.video_setting?.add_audio_file) {
                setDbAudio(filePath + event?.video_setting?.add_audio_file);
            }
        }, [event]);
    
    const handleFileSelect = (files: File[]) => {
        // if file is not audio return
        if (!isAudioFile(files[0])) { 
            toast({
                title: "Error",
                description: "Please select an audio file.",
                variant: "destructive",
            })
            return;
         }

        // set audio file to null
        setAudioFile(null);
        // console.log(files);
        setData('audioFile', null);
        if (files.length > 0) {
            const file = files[0];
            setAudioFile(file);
            setData('audioFile', file);
            const url = URL.createObjectURL(file);
            setAudioUrl(url);
        }
    };

    const handleFileRemove = () => {
        setAudioFile(null);
        setData('audioFile', null);
        setAudioUrl(null);
        setIsPlaying(false);
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    };

    const togglePlayPause = () => {
        // console.log(event?.vedio_setting?.add_audio_file)
        // if(dbAudio) {
        //     //open audio in new tab
        //     window.open(dbAudio, '_blank');
        // }
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

   
      const { data, setData, post, progress, processing, errors } = useForm({
        audioFile: null as File | null,
      })
      
 

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
          toast({
            title: "Success",
            description: "Audio updated successfully",
            variant: "default",
          })
        },
        onError: () => {
          toast({
            title: "Error",
            description: "Something went wrong",
            variant: "destructive",
          })
      }
    });
      
    }

    return (
        <div className="space-y-4"> 
            <Suspense fallback={<Loader className="mx-auto" size={20} />}>
                <FileUpload
                    onFilesSelected={handleFileSelect}
                    onFileRemove={handleFileRemove}
                    multiple={false}
                    acceptedTypes={['audio/*']}
                    maxSize={10 * 1024 * 1024} // 10MB
                    showPreview={false} 
                />
            </Suspense>
           
            {(event?.video_setting?.add_audio_file || audioFile) && (
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
                                    <span className="text-sm flex font-medium">{audioFile?.name}
                                        <CustomTooltip content="Remove">
                                        <span><Trash2 onClick={handleFileRemove} className='ml-2 text-danger cursor-pointer' size={16}/></span>
                                        </CustomTooltip>
                                     </span>
                                </div>
                                <div className="ms-auto">
                                    {audioFile && <span className="font-medium text-textmuted dark:text-textmuted/50">
                                        {formatFileSize(audioFile.size)}
                                    </span>}
                                </div>
                            </div>
                        </li>
                    </ul>
                    
                    <audio 
                        ref={audioRef}
                        src={dbAudio || audioUrl || undefined}
                        onEnded={() => setIsPlaying(false)}
                        className="hidden"
                    />
                    <Button 
                    onClick={handleSubmit}
                    disabled={!audioFile || processing} 
                    className="ti-btn ti-btn-primary w-full">
                    <ArrowUpFromLine />Upload</Button>
                </div>
            )}
              {progress && (<progress value={progress.percentage} max="100">{progress.percentage}%</progress>)}
            <Toaster />
        </div>
    )
}