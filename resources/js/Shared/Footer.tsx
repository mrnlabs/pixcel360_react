import { Link } from '@inertiajs/react'
import { MoveUp } from 'lucide-react'
import React from 'react'

export default function Footer() {
// if page view is top hide scroll to top
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    const scrollToTopButton = document.querySelector(".scrollToTop");
    if (scrollToTopButton) {
    const scrollToTopButton = document.querySelector(".scrollToTop") as HTMLElement;
    if (scrollToTopButton) {
      scrollToTopButton.style.display = "none";
    }
    }
  } else {
    const scrollToTopButton = document.querySelector(".scrollToTop") as HTMLElement;
    if (scrollToTopButton) {
      scrollToTopButton.style.display = "none";
    }
  }
}
  return (
    <>
    <footer className="mt-auto py-4 bg-white dark:bg-bodybg text-center border-t border-defaultborder dark:border-defaultborder/10">
    <div className="container">
      <span className="text-textmuted dark:text-textmuted/50"> Copyright © <span id="year">2025</span>
        <Link href="javascript:void(0);" className="text-dark font-medium">Pixcel</Link>. Designed with <span className="text-danger">❤</span> by <a href="https://mrnlabs.com" target="_blank">
          <span className="font-medium text-primary">mrnlabs</span>
        </a> All rights reserved </span>
    </div>
  </footer>
  <div onClick={() => window.scrollTo(0, 0)} className="scrollToTop cursor-pointer" > 
    <span className="arrow">
    <MoveUp className='text-xl' />
    </span> 
    </div>
    </>
  )
}
