import { useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function QuillEditor({
    quillValue,
    setQuillValue
}:{
    quillValue: string,
    setQuillValue: (value: string) => void
}) {

    const quillRef = useRef<ReactQuill>(null);

    const modules = {
      toolbar: [
        [{ 'header': [1, 2,3,4,5,6, false] }],
        ['bold', 'italic', 'underline','strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link'],
        ['clean']
      ],
    }

    const formats = [
      'header',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent',
      'link',
    ]

  return (
    <ReactQuill 
    modules={modules}
    formats={formats}
    ref={quillRef}
    style={{height: '100%'}}
    theme="snow" 
    value={quillValue} 
    onChange={setQuillValue}
     />
  )
}
