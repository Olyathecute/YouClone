export default function SignUp() {
  return (
    <div className='flex flex-col items-center justify-center gap-2'>
      <input type='text' placeholder='Username' id='SignUpUserUsername' />
      <input type='text' placeholder='Email' id='SignUpUserEmail' />
      <input type='password' placeholder='Password' id='SignUpUserPassword' />
    </div>
  )
}
