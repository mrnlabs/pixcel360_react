import { Search } from "lucide-react";

export function HeaderSearch() {
    
    return (
      <div className="header-element header-search md:!block !hidden my-auto auto-complete-search">
      <div className="autoComplete_wrapper" role="combobox" aria-owns="autoComplete_list_1" aria-haspopup="true" aria-expanded="false">
        <input type="text" className="header-search-bar form-control" id="header-search" placeholder="Search event ..." 
        autoComplete="off" />
        <ul id="autoComplete_list_1" role="listbox" hidden={false}></ul>
      </div>
      <a aria-label="anchor" href="javascript:void(0);" className="header-search-icon border-0">
      <Search size={16} />
      </a>
    </div>
    )
}