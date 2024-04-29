
interface  useFileUploadType {
  files : File [] , fileTitle :string, data : any
}
const useFileUpload = ({files , fileTitle, data}  :useFileUploadType) => {

  const formData = new FormData();
  if (files) {
    for (let i = 0; i < files.length; i++) {
      formData.append(fileTitle, files[i]);
      // console.log(formData);
    }
  }
  const jsonStr = JSON.stringify(data);
  formData.append("data", new Blob([jsonStr], { type: "application/json" }));

  return formData ;
  
};

export default useFileUpload;