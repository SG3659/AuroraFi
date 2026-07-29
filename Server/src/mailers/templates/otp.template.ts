import { generateOtp } from "../../utils/otp-generator.js"
export const otpTemplate = (otp: string) => {

  return `
     <!DOCTYPE html>
<html>
<head>
<title>Enter this code to sign in</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f6f9; font-family:Arial, Helvetica, sans-serif; color:#333;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f9; padding:40px 0;">
    <tr>
      <td align="center">
        <table width="500" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:14px; box-shadow:0 10px 30px rgba(0,0,0,0.08); padding:40px;">
          
          <!-- Header -->
          <tr>
            <td align="center" style="padding-bottom:25px;">
              <h2 style="margin:0; color:#00bc7d; font-weight:700;">
                AuroraFi
              </h2>
            </td>
          </tr>

          <!-- Title -->
          <tr>
            <td align="center" style="padding-bottom:10px;">
              <h1 style="margin:0; font-size:22px; font-weight:600; color:#111;">
                Verify Your Sign-In
              </h1>
            </td>
          </tr>

          <!-- Subtitle -->
          <tr>
            <td align="center" style="padding-bottom:30px; font-size:14px; color:#666;">
              Use the secure code below to continue.
            </td>
          </tr>

          <!-- OTP Box -->
          <tr>
            <td align="center" style="padding-bottom:30px;">
              <div style="
                display:inline-block;
                padding:18px 36px;
                font-size:34px;
                letter-spacing:8px;
                font-weight:bold;
                color:#00a86b;
                background:#e6f9f2;
                border-radius:12px;
                border:1px solid #b2f0d9;">
                ${otp}
              </div>
              <div style="margin-top:12px; font-size:13px; color:#888;">
                This code expires in 10 minutes
              </div>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="font-size:14px; line-height:1.6; color:#555; padding-bottom:20px;">
              If you didn’t request this code, you can safely ignore this email or
              <a href="#" style="color:#00bc7d; text-decoration:none; font-weight:500;">
                review your recent device activity
              </a>.
            </td>
          </tr>

          <!-- Security Note -->
          <tr>
            <td style="font-size:13px; color:#999; padding:15px 0; border-top:1px solid #eee;">
              For your security, never share this code with anyone.
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="font-size:13px; color:#777; padding-top:15px;">
              — The AuroraFi Team
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `;
}