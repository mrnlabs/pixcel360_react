import ConfirmDialog from '@/Components/ConfirmDialog';
import CustomTooltip from '@/Components/CustomTooltip';
import FileUpload from '@/Components/FileUpload'
import { Button } from '@/Components/ui/button';
import { formatFileSize } from '@/utils/formatFileSize';
import { isAudioFile } from '@/utils/isAudioFile';
import showToast from '@/utils/showToast';
import { router, useForm, usePage } from '@inertiajs/react';
import { Loader, Play, Pause, ArrowUpFromLine, Trash2 } from 'lucide-react'
import React, { Suspense, useState, useRef, useEffect } from 'react'

export default function Audio({event}: any) {
    const filePath = usePage().props.filePath;
    const [dbAudio, setDbAudio] = useState(null);

    
    const [dialogOpen, setDialogOpen] = useState(false);

    const [audioFile, setAudioFile] = useState<File | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

        useEffect(() => {
            if (event?.boomerang_setting?.add_audio_file) {
                setDbAudio(filePath + event?.boomerang_setting?.add_audio_file);
            }
        }, [event]);
    
    const handleFileSelect = (files: File[]) => {
        // if file is not audio return
        if (!isAudioFile(files[0])) { 
            showToast('error', 'Please select an audio file.', {position: 'bottom-right'});
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
        // console.log(event?.vedio_setting?.add_audio_file)
        if(dbAudio) {
            setDialogOpen(true)
        }
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
            showToast('success', 'Audio updated successfully.', {position: 'bottom-right'});
        },
        onError: () => {
            showToast('error', 'Something went wrong.', {position: 'bottom-right'});
      }
    });
      
    }

    const deleteDBFile = () => {
        router.delete(route('event.update.audio', event.slug), {
            preserveScroll: true,
            onSuccess: () => {
                showToast('success', 'Audio deleted successfully.', {position: 'bottom-right'});
            },
            onError: () => {
                showToast('error', 'Something went wrong.', {position: 'bottom-right'});
            }
        })
    }

    return (
        <div className="space-y-4"> 
            <Suspense fallback={<Loader className="mx-auto" size={20} />}>
                <FileUpload
                    dropzoneText="Drag and drop an audio file here or click to browse"
                    onFilesSelected={handleFileSelect}
                    onFileRemove={handleFileRemove}
                    multiple={false}
                    acceptedTypes={['audio/*']}
                    maxSize={10 * 1024 * 1024} // 10MB
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
                    className="ti-btn bg-[linear-gradient(243deg,#FF4F84_0%,#394DFF_100%)] text-white w-full">
                    <ArrowUpFromLine />Upload</Button>
                </div>
            )}
              {progress && (<progress value={progress.percentage} max="100">{progress.percentage}%</progress>)}
              <Suspense fallback={""}>
              <ConfirmDialog 
                message="Do you want to delete this file from database ?"
                dialogOpen={dialogOpen} 
                setDialogOpen={setDialogOpen}
                onContinue={deleteDBFile}
             />
        </Suspense>
        </div>
    )
}