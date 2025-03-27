const DeleteJobModal = ({ close, confirm }) => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div className="bg-white p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Delete Job</h2>
          <p>Are you sure you want to delete this job?</p>
          <p className="text-red-500">10% of the deposit will be deducted.</p>
          <div className="flex justify-end space-x-2 mt-4">
            <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={close}>
              Cancel
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={confirm}>
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default DeleteJobModal;
  
  