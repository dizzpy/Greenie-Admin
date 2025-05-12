import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImageUp } from 'lucide-react';

function AddChallenges() {
  const navigate = useNavigate();
  const fileInputRef = useRef();
  const [formData, setFormData] = useState({
    photoUrl: '',
    name: '',
    points: '',
    description: '',
  });
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleImageUpload = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setFormData(prev => ({ ...prev, photoUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    const payload = {
      challengeName: formData.name,
      points: parseInt(formData.points),
      description: formData.description,
      photoUrl: formData.photoUrl,
    };

    try {
      const response = await fetch('http://localhost:8080/api/admin/challenges/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const resultText = await response.text();

      if (response.ok) {
        setMessage('Challenge added successfully!');
        setIsError(false);
        setFormData({ photoUrl: '', name: '', points: '', description: '' });
        setPreview('');
        setTimeout(() => navigate('/admin/challenges'), 2000);
      } else {
        setMessage(resultText || 'Failed to add challenge.');
        setIsError(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error submitting challenge.');
      setIsError(true);
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(''), 5000);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg">
      {message && (
        <div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg ${
            isError ? 'bg-red' : 'bg-primaryGreen'
          } text-white`}
        >
          {message}
        </div>
      )}

      <h2 className="text-2xl font-semibold mb-4 border-b pb-3 mt-6">Add New Challenge</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4 mt-4">
          <label className="block text-gray-700 font-medium mb-2">
            Upload an Image <span className="text-red">*</span>
          </label>
          <div
            className="border-2 h-full p-6 flex flex-col items-center justify-center rounded-lg cursor-pointer"
            onClick={handleUploadClick}
          >
            {preview ? (
              <img
                src={preview}
                alt="Uploaded preview"
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <>
                <ImageUp className="text-gray-500 text-2xl mb-2" />
                <p className="text-gray-500 text-sm text-center">
                  Click to upload image
                  <br />
                </p>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageUpload}
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Challenge Name <span className="text-red">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter challenge name"
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Number of Points <span className="text-red">*</span>
          </label>
          <input
            type="number"
            name="points"
            value={formData.points}
            onChange={handleChange}
            placeholder="Enter points"
            className="w-full border border-gray-300 p-2 rounded"
            min="1"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Challenge Description <span className="text-red">*</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter challenge description"
            className="w-full border border-gray-300 p-2 rounded h-24"
            required
          />
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="button"
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md w-1/2 mr-2 transition-colors"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-primaryGreen hover:bg-green-600 text-white px-4 py-2 rounded-md w-1/2 ml-2 transition-colors disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Challenge'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddChallenges;
