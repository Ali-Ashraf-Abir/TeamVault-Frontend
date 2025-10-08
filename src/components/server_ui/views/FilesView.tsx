import React from 'react';
import { Plus, Paperclip, MoreVertical } from 'lucide-react';

const FilesView: React.FC = () => {
  const files = [
    { id: '1', name: 'project-requirements.pdf', size: '2.4 MB', uploadedBy: 'John Doe', date: 'Oct 1, 2025' },
    { id: '2', name: 'design-mockup.png', size: '1.8 MB', uploadedBy: 'Mike Johnson', date: 'Oct 2, 2025' },
    { id: '3', name: 'meeting-notes.docx', size: '156 KB', uploadedBy: 'Jane Smith', date: 'Sep 30, 2025' },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-primary">Files</h2>
          <button className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Upload File
          </button>
        </div>
        <div className="grid gap-3">
          {files.map((file) => (
            <div key={file.id} className="card p-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <Paperclip className="w-6 h-6 text-primary-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-primary">{file.name}</h3>
                <p className="text-sm text-secondary">
                  {file.size} • Uploaded by {file.uploadedBy} • {file.date}
                </p>
              </div>
              <button className="p-2 hover:bg-accent rounded transition-colors">
                <MoreVertical className="w-5 h-5 text-secondary" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilesView;