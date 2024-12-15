import './App.css'

function App() {
  return (
    <div className="w-full max-w-2xl mx-auto px-6">
      <Markdowner
        initialBlocks={initialBlocks}
        onUpload={async (formData) => {
          console.log(formData)
          return {
            alt: '',
            path: '',
            caption: '',
          }
        }}
      />
    </div>
  )
}

export default App
