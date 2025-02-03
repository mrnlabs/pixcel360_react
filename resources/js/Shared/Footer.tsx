import React from 'react'

export default function Footer() {
  return (
    <footer className="mt-auto py-4 bg-white dark:bg-bodybg text-center border-t border-defaultborder dark:border-defaultborder/10">
    <div className="container">
      <span className="text-textmuted dark:text-textmuted/50"> Copyright © <span id="year">2025</span>
        <a href="javascript:void(0);" className="text-dark font-medium">Xintra</a>. Designed with <span className="text-danger">❤</span> by <a href="javascript:void(0);">
          <span className="font-medium text-primary">Spruko</span>
        </a> All rights reserved </span>
    </div>
  </footer>
  )
}
