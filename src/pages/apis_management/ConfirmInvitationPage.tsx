import { useState, useEffect } from 'react';
import { Modal, Button } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { acceptInvitationUserPlan } from '@/components/features/apis_management/privatePlanSlice';
import { useAppDispatch } from '@/app/store'; 

const ConfirmInvitationPage = () => {
  const { id, plan } = useParams();
  const [showPopup, setShowPopup] = useState(Boolean(plan));
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Check if the user is logged in
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user_id');

    // If the user is not logged in, redirect them to the login page
    if (!token || !userId) {
       navigate(`/login/${id}/${plan}`);
    }
  }, [navigate]);

  const handleOk = async () => {
    // Dispatch the async thunk to accept the invitation user plan
    try {
      await dispatch(acceptInvitationUserPlan(parseInt(plan)));
      setShowPopup(false); // Close the pop-up after successful acceptance
      navigate(`/api/payment/Plans/${id}`);
    } catch (error) {
      // Handle any error that occurs during the API call
      console.error('Error accepting invitation:', error);
      // You can optionally show an error message to the user
    }
  };

  const handleCancel = () => {
    // Handle cancel button click or outside click
    setShowPopup(false); // Close the pop-up
  };

  return (
    <div>
      {/* Your Subscription Plans Page content */}

      {/* Conditionally render the pop-up based on the existence of the plan parameter */}
      {showPopup && (
        <Modal
          title="Private Plan Confirmation"
          visible={true}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="cancel" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button key="ok" type="primary" onClick={handleOk}>
              OK
            </Button>,
          ]}
        >
            To accept the invitation and subscribe to the private subscription plan, please click on OK.
        </Modal>
      )}
    </div>
  );
};

export default ConfirmInvitationPage;