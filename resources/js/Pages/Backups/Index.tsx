// resources/js/Pages/Backup/Index.jsx
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Breadcrumb } from '@/Shared/Breadcrumb';
import showToast from '@/utils/showToast';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import React, { useState } from 'react';

export default function Index({schedules}:{ schedules: any }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    scheduled_at: '',
    scheduled_time: '',
    frequency: 'once',
  });

  const frequencies = [
    { id: 'once', name: 'One time only' },
    { id: 'daily', name: 'Daily' },
    { id: 'weekly', name: 'Weekly' },
    { id: 'monthly', name: 'Monthly' },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Combine date and time
    const scheduledDateTime = new Date(`${data.scheduled_at}T${data.scheduled_time}`);
    
    post(route('backup.schedule.store'), {
      ...data,
      // @ts-ignore
      scheduled_at: scheduledDateTime.toISOString(),
      onSuccess: () => {
        reset()
        showToast('success','Backup scheduled successfully', {position: 'bottom-right'});
      },
      onError: () => {
        showToast('error','Error scheduling backup', {position: 'bottom-right'});
      }
    });
  };

  const runBackupNow = () => {
    router.post(route('backup.run-now'));
    showToast('success','Backup started successfully', {position: 'bottom-right'});
  };

  const deleteSchedule = (id: number) => {
    if (confirm('Are you sure you want to delete this schedule?')) {
      router.delete(route('backup.schedule.destroy', id));
    }
  };

  return (
    <Authenticated>
      <Head title="Events" />
          <div className="main-content app-content">
            <div className="container-fluid">
             <Breadcrumb
             items={[
                { label: 'Home', href: '/dashboard' },
                { label: 'Database backups', active: true }
              ]}
              />
             
              <div className="grid grid-cols-12 gap-x-6">
                <div className="xxl:col-span-12 col-span-12">
                  <div className="box">
                  <div className="p-6 bg-white border-b border-gray-200">
              <h2 className="text-2xl font-bold mb-6">Database Backup Schedule</h2>
              
              <div className="mb-8">
                <button 
                  onClick={runBackupNow} 
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                >
                  Run Backup Now
                </button>
                <button onClick={() => router.post(route('backup.cleanup'))} 
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded ml-4">
                    Clean Old Backups
                  </button>
              </div>
              
              {/* <ValidationErrors errors={errors} /> */}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="name">
                    Name (Optional)
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="w-full px-3 py-2 border rounded"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 mb-2" htmlFor="scheduled_at">
                      Date
                    </label>
                    <input
                      id="scheduled_at"
                      type="date"
                      className="w-full px-3 py-2 border rounded"
                      value={data.scheduled_at}
                      onChange={(e) => setData('scheduled_at', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2" htmlFor="scheduled_time">
                      Time
                    </label>
                    <input
                      id="scheduled_time"
                      type="time"
                      className="w-full px-3 py-2 border rounded"
                      value={data.scheduled_time}
                      onChange={(e) => setData('scheduled_time', e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="frequency">
                    Frequency
                  </label>
                  <select
                    id="frequency"
                    className="w-full px-3 py-2 border rounded"
                    value={data.frequency}
                    onChange={(e) => setData('frequency', e.target.value)}
                  >
                    {frequencies.map((frequency) => (
                      <option key={frequency.id} value={frequency.id}>
                        {frequency.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="mb-4">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                    disabled={processing}
                  >
                    {processing ? 'Scheduling...' : 'Schedule Backup'}
                  </button>
                </div>
              </form>
              
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">Scheduled Backups</h3>
                
                {schedules.length === 0 ? (
                  <p>No scheduled backups.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                      <thead>
                        <tr>
                          <th className="py-2 px-4 bg-gray-100 border-b border-gray-200 text-left">Name</th>
                          <th className="py-2 px-4 bg-gray-100 border-b border-gray-200 text-left">Schedule</th>
                          <th className="py-2 px-4 bg-gray-100 border-b border-gray-200 text-left">Frequency</th>
                          <th className="py-2 px-4 bg-gray-100 border-b border-gray-200 text-left">Status</th>
                          <th className="py-2 px-4 bg-gray-100 border-b border-gray-200 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {schedules.map((schedule: any) => (
                          <tr key={schedule.id}>
                            <td className="py-2 px-4 border-b border-gray-200">
                              {schedule.name || `Backup ${schedule.id}`}
                            </td>
                            <td className="py-2 px-4 border-b border-gray-200">
                              {schedule.scheduled_at}, {schedule.scheduled_time}
                            </td>
                            <td className="py-2 px-4 border-b border-gray-200 capitalize">
                              {schedule.frequency}
                            </td>
                            <td className="py-2 px-4 border-b border-gray-200">
                              {schedule.is_active ? (
                                <span className="bg-green-100 text-green-800 py-1 px-2 rounded-full text-xs">Active</span>
                              ) : (
                                <span className="bg-gray-100 text-gray-800 py-1 px-2 rounded-full text-xs">Completed</span>
                              )}
                            </td>
                            <td className="py-2 px-4 border-b border-gray-200">
                              <button
                                onClick={() => deleteSchedule(schedule.id)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
                  </div>
                </div>
              </div>
            
            </div>
          </div>
    </Authenticated>
  );
}