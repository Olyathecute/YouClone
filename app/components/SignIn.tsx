export default function SignIn() {
  return (
    <div className='flex flex-col items-center justify-center gap-2'>
      <input type='text' placeholder='Username' id='username' />
      <input type='password' placeholder='Password' id='password' />
    </div>
  )
}
