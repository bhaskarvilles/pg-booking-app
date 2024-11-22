import { useState } from 'react';
import { Edit, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function ProfileInfo() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: 'John Doe',
    phone: '+91 98765 43210',
    address: 'Bangalore, Karnataka',
    occupation: 'Software Engineer'
  });

  const handleSave = () => {
    // In real app, save to backend
    setIsEditing(false);
    toast.success('Profile updated successfully');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Profile Information</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
        >
          {isEditing ? (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save
            </>
          ) : (
            <>
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </>
          )}
        </Button>
      </div>

      <div className="grid gap-6">
        {Object.entries(formData).map(([key, value]) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </label>
            {isEditing ? (
              <Input
                value={value}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, [key]: e.target.value }))
                }
              />
            ) : (
              <p className="text-gray-900">{value}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}