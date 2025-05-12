import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function ReviewChallenges() {
  const navigate = useNavigate();
  const { challengeId } = useParams();

  const [formData, setFormData] = useState({
    photoUrl: '',
    name: '',
    points: '',
    description: '',
    addedBy: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function fetchChallenge() {
      try {
        const response = await fetch(`http://localhost:8080/api/challenges/${challengeId}`);
        if (!response.ok) throw new Error('Failed to fetch challenge');

        const data = await response.json();
        setFormData({
          photoUrl: data.photoUrl || '',
          name: data.name || data.challengeName || '',
          points: data.points || '',
          description: data.description || '',
          addedBy: data.addedBy || '',
        });
      } catch (error) {
        console.error('Error fetching challenge:', error);
        setMessage('Failed to load challenge data');
        setIsError(true);
      }
    }

    fetchChallenge();
  }, [challengeId]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch(
        `http://localhost:8080/api/admin/challenges/approve/${challengeId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setMessage('Challenge approved successfully!');
        setIsError(false);
        setFormData({ photoUrl: '', name: '', points: '', description: '', addedBy: '' });
      } else {
        setMessage('Failed to approve challenge.');
        setIsError(true);
      }
    } catch (error) {
      console.error('Error approving challenge:', error);
      setMessage('Error approving challenge.');
      setIsError(true);
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(''), 5000);
    }
  }

  async function handleDelete() {
    const confirmDelete = window.confirm('Are you sure you want to delete this challenge?');
    if (!confirmDelete) return;

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch(
        `http://localhost:8080/api/admin/challenges/delete/${challengeId}`,
        {
          method: 'DELETE',
        }
      );

      if (response.ok) {
        setMessage('Challenge deleted successfully!');
        setIsError(false);
        setTimeout(() => navigate('/challenges/pending-challenges'), 1500);
      } else {
        setMessage('Failed to delete challenge.');
        setIsError(true);
      }
    } catch (error) {
      console.error('Error deleting challenge:', error);
      setMessage('Error deleting challenge.');
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
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg text-white ${
            isError ? 'bg-red' : 'bg-primaryGreen'
          }`}
        >
          {message}
        </div>
      )}

      <h2 className="text-2xl font-semibold text-text-gray border-b pb-3 mb-4 mt-6">
        Review Challenge
      </h2>

      {/* Image Preview Only */}
      <div className="mb-4 mt-4">
        <label className="block text-gray-700 font-medium mb-2">
          Challenge Image<span className="text-red">*</span>
        </label>
        <div className="border-2 h-full p-6 flex flex-col items-center justify-center rounded-lg">
          {formData.photoUrl ? (
            <img
              src={formData.photoUrl}
              alt="Challenge Preview"
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <p className="text-gray-500 text-sm">Image preview will appear here</p>
          )}
        </div>
      </div>

      {/* Challenge Name */}
      <div className="mb-4 mt-4">
        <label className="block text-gray-700 font-medium mb-1">
          Challenge Name <span className="text-red">*</span>
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter challenge name"
          className="border border-gray-300 p-3 w-full rounded-md"
        />
      </div>

      {/* Points */}
      <div className="mb-4 mt-4">
        <label className="block text-gray-700 font-medium mb-1">
          Number of Points <span className="text-red">*</span>
        </label>
        <input
          type="number"
          name="points"
          value={formData.points}
          onChange={handleChange}
          placeholder="Enter points"
          className="border border-gray-300 p-3 w-full rounded-md"
        />
      </div>

      {/* Description */}
      <div className="mb-4 mt-4">
        <label className="block text-gray-700 font-medium mb-1">
          Challenge Description <span className="text-red">*</span>
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter challenge description"
          className="border border-gray-300 p-3 w-full rounded-md"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-6">
        <button
          className="bg-red text-white px-4 py-2 rounded-md w-1/2 mr-2"
          onClick={handleDelete}
          disabled={loading}
        >
          {loading ? 'Deleting...' : 'Delete'}
        </button>
        <button
          onClick={handleSubmit}
          className="bg-primaryGreen text-white px-4 py-2 rounded-md w-1/2 ml-2"
          disabled={loading}
        >
          {loading ? 'Approving...' : 'Approve'}
        </button>
      </div>
    </div>
  );
}

export default ReviewChallenges;
