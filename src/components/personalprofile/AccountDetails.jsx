import { useState } from "react";

function AccountDetails({ select }) {
  const [changePassword, setChangePassword] = useState(false);

  const handleChangePassword = () => setChangePassword(true);

  return (
    <>
      {select === "AccountDetails" && (
        <>
          <h1>Account Details</h1>
          <img src="" alt="avatar" />
          <div>
            Username :<span>XXX</span>
          </div>
          <div>
            Email address:
            <span>XXX</span>
          </div>
          <div>
            DOB: <span>XXX</span>
          </div>
          <div onClick={handleChangePassword} name="changePassword">
            Change Password
            {changePassword ? (
              <>
                <label>
                  Current Password
                  <input type="password" name="Current Password" />
                </label>
                <label>
                  New Password
                  <input type="password" name="New Password" />
                </label>
                <button>Submit</button>
              </>
            ) : null}
          </div>
        </>
      )}
    </>
  );
}

export default AccountDetails;
