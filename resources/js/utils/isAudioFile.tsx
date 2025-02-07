export function isAudioFile(file: File) {
    // Common audio file extensions
    const audioExtensions = ['.mp3', '.wav', '.ogg', '.m4a', '.aac', '.wma', '.flac'];
    
    // Common audio MIME types
    const audioMimeTypes = [
        'audio/mpeg',
        'audio/wav',
        'audio/ogg',
        'audio/mp4',
        'audio/aac',
        'audio/webm',
        'audio/flac'
    ];

    // Check file extension
    const fileName = file.name.toLowerCase();
    const hasAudioExtension = audioExtensions.some(ext => fileName.endsWith(ext));

    // Check MIME type
    const isAudioMime = audioMimeTypes.includes(file.type);

    return hasAudioExtension && isAudioMime;
}
