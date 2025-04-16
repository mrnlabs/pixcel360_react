import React from 'react'

export default function SupportDetails({issue}: any) {
  console.log(issue.screenshots)
  return (
    <div className="tab-pane p-0" id="security" role="tabpanel">
    <ul className="ti-list-group list-group-flush list-none !rounded-none">
      <li className="ti-list-group-item">
        <div className="grid grid-cols-12 gap-x-5 gap-y-3">
          <div className="xl:col-span-5 col-span-12">
            <p className="text-[1rem] mb-1 font-medium">Ticket Details</p>
          </div>
          <div className="xl:col-span-7 col-span-12">
            <div className="flex items-top justify-between mt-sm-0 mt-3">
              <div className="mail-notification-settings">
                <p className="text-[14px] mb-1 font-medium">Title</p>
                <p className="text-xs mb-0 text-textmuted dark:text-textmuted/50"> {issue?.title} </p>
              </div>
            </div>
            <div className="flex items-top justify-between mt-3">
              <div className="mail-notification-settings">
                <p className="text-[14px] mb-1 font-medium">Category</p>
                <p className="text-xs mb-0 text-textmuted dark:text-textmuted/50"> {issue?.category.name}</p>
              </div>
            </div>
            <div className="flex items-top justify-between mt-3">
              <div className="mail-notification-settings">
                <p className="text-[14px] mb-1 font-medium">Description</p>
                <p className="text-xs mb-0 text-textmuted dark:text-textmuted/50" dangerouslySetInnerHTML={{__html: issue?.description ?? ""}}></p>
              </div>
              <div className="toggle toggle-success on mb-0 sm:float-end" id="mail-chat-messages">
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li className="ti-list-group-item">
        <div className="grid grid-cols-12 gap-x-5 gap-y-3">
          <div className="xl:col-span-5 col-span-12">
            <p className="text-[1rem] mb-1 font-medium">Browser Details</p>
            <p className="text-xs mb-0 text-textmuted dark:text-textmuted/50"></p>
          </div>
          <div className="xl:col-span-7 col-span-12">
            <div className="flex items-top justify-between mt-sm-0 mt-3">
              <div className="mail-notification-settings">
                <p className="text-[14px] mb-1 font-medium">Browser</p>
                <p className="text-xs mb-0 text-textmuted dark:text-textmuted/50"> {issue?.browser}</p>
              </div>
              <div className="toggle toggle-success on mb-0 sm:float-end" id="push-new-mails">
                <span></span>
              </div>
            </div>
            <div className="flex items-top justify-between mt-3">
              <div className="mail-notification-settings">
                <p className="text-[14px] mb-1 font-medium">Operating System</p>
                <p className="text-xs mb-0 text-textmuted dark:text-textmuted/50"> {issue?.os}</p>
              </div>
              <div className="toggle toggle-success on mb-0 sm:float-end" id="push-mail-chat-messages">
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li className="ti-list-group-item">
        <div className="grid grid-cols-12 gap-x-5 gap-y-3">
          <div className="xl:col-span-5 col-span-12">
            <p className="text-[1rem] mb-1 font-medium">Screenshots</p>
            <p className="text-xs mb-0 text-textmuted dark:text-textmuted/50"></p>
          </div>
          <div className="xl:col-span-7 col-span-12">
            <div className="flex items-top justify-between mt-sm-0 mt-3">
              <div className="mail-notification-settings w-full">
                <p className="text-[14px] mb-1 font-medium">{issue.screenshots.length} Screenshots</p>
                <div className="grid grid-cols-12">
                  {issue.screenshots.map((screenshot: any) => (     
                     <div key={screenshot} className="xl:col-span-6 col-span-12">
                      <div className="box !w-[75%]">
                        <div className="box-header">
                          <div className="box-title">
                            <img src={screenshot} alt="screenshot"/>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
  )
}
