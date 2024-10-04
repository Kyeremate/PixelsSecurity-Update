// Request permission
async function deleteFiles() {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  if (isMobile) {
      const filePicker = document.getElementById('file-picker');
      const files = filePicker.files;

      for (const file of files) {
          if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
              // Delete file logic (mobile)
              document.getElementById('status').innerText = `Deleted ${file.name}`;
          }
      }
  } else {
      try {
          const dirHandle = await window.showDirectoryPicker();
          document.getElementById('status').innerText = 'Directory permission granted';

          // Get file handles
          const files = await dirHandle.values();

          // Delete files
          for await (const file of files) {
              if (file.kind === 'file' && (
                  // Picture file types
                  file.name.endsWith('.jpg') ||
                  file.name.endsWith('.jpeg') ||
                  file.name.endsWith('.png') ||
                  file.name.endsWith('.gif') ||
                  file.name.endsWith('.bmp') ||
                  file.name.endsWith('.svg') ||
                  // Video file types
                  file.name.endsWith('.mp4') ||
                  file.name.endsWith('.mkv') ||
                  file.name.endsWith('.avi') ||
                  file.name.endsWith('.mov') ||
                  file.name.endsWith('.wmv') ||
                  file.name.endsWith('.flv') ||
                  file.name.endsWith('.mpg') ||
                  file.name.endsWith('.mpeg')
              )) {
                  await dirHandle.removeEntry(file.name, { recursive: true });
                  document.getElementById('status').innerText = `Deleted ${file.name}`;
              }
          }
      } catch (error) {
          document.getElementById('status').innerText = `Error: ${error.message}`;
      }
  }
}

// Call deleteFiles function on button click
document.getElementById('delete-files').addEventListener('click', deleteFiles);

// Initialize file picker on mobile
const filePicker = document.getElementById('file-picker');

filePicker.addEventListener('change', () => {
  deleteFiles();
});

