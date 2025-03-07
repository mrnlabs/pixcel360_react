import WordpressHeader from '@/Shared/WordpressHeader';
import { PropsWithChildren } from 'react';

export default function WordPressLayout({ children }: PropsWithChildren) {
    return (
        <body className="font-sans">
            
           <WordpressHeader/>

        {children}
         
        </body>
    );
}
