import React from 'react'
import VideoPlayer from './VideoPlayer'
import { Event, EventProps } from '@/types';
import { usePage } from '@inertiajs/react';

export default function OverLayCard({overlay, setModalOpen}: 
  {
  overlay: any,
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  
  return (
    <div className="col">
            <div className="box">
              <img src={overlay?.path} className="object-fill h-80 card-img-top" alt="..."/>
              <div className="box-body">
                <h6 className="font-medium mb-3">{overlay?.name}</h6>
                <p className="card-text"> If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. </p>
              </div>
            </div>
          </div>
  )
}
