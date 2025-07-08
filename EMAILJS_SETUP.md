# EmailJS Setup for OTP System

## Steps to configure EmailJS:

### 1. Create EmailJS Account
- Go to [EmailJS](https://www.emailjs.com/)
- Create a free account

### 2. Add Email Service
- Go to Email Services
- Add a new service (Gmail, Outlook, etc.)
- Note down the Service ID

### 3. Create Email Template
- Go to Email Templates
- Create a new template with the following content:

**IMPORTANT:** Make sure your EmailJS template is configured exactly like this:

**Template Variables (these must match exactly):**
- `{{to_email}}` - Recipient email
- `{{to_name}}` - Recipient name  
- `{{otp_code}}` - The OTP code
- `{{hotel_name}}` - Hotel name

**Template Configuration:**
1. **To Email**: `{{to_email}}`
2. **From Name**: Your hotel name
3. **Reply To**: Your email address
4. **Subject**: `OTP Verification - {{hotel_name}}`

**Email Body Template:**
```
Dear {{to_name}},

Your OTP for booking verification at {{hotel_name}} is:

{{otp_code}}

This OTP is valid for 10 minutes. Please do not share this code with anyone.

Thank you for choosing {{hotel_name}}!

Best regards,
{{hotel_name}} Team
```

**CRITICAL:** In EmailJS template settings, make sure:
- The "To Email" field contains exactly: `{{to_email}}`
- All variable names use double curly braces: `{{variable_name}}`

### 4. Get Your Credentials
- Service ID: From your email service
- Template ID: From your email template
- Public Key: From Account > API Keys

### 5. Configure Environment Variables

Create a `.env` file in the project root and add your credentials:

```bash
# EmailJS Configuration
REACT_APP_EMAILJS_SERVICE_ID=your_service_id_here
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id_here
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key_here
```

**Important Notes:**
- Environment variables must start with `REACT_APP_` to be accessible in React
- Never commit the `.env` file with real credentials to version control
- Add `.env` to your `.gitignore` file
- The `.env` file should be in the same directory as `package.json`

### 6. Update .gitignore

Make sure your `.gitignore` file includes:
```
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
```

## Security Notes:
- Public key is safe to use in frontend
- Never expose private keys in frontend code
- Consider rate limiting for OTP requests in production
- Implement OTP expiry time (currently not implemented)

## Testing:
1. Enter a valid email address
2. Click "Send OTP"
3. Check your email for the OTP code
4. Enter the OTP and click "Verify"
5. Complete the booking form
