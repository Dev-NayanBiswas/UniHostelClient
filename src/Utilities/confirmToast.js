import Swal from "sweetalert2";
import './sweetAler.css'

function confirmToast(fn,messages){
    // const messages = {
    //     title1:"Sure you want to Update?",
    //     title2:"Updated Successfully",
    //     text1:'Update will Change the review',
    //     btnText:'Update',
    //     icon:'question',
    //     icon2:'success',
    // }

    const {title1, text1, btnText, icon} = messages || {}

  Swal.fire({
    title: title1,
    text: text1,
    icon: icon,
    showCancelButton: true,
    cancelButtonText:"May be Later",
    confirmButtonText: btnText,
    customClass: {
        popup: 'custom-popup',
        title: 'custom-title',
        confirmButton: 'custom-confirm-button',
        cancelButton: 'custom-cancel-button'
      }
  }).then((result) => {
    if (result.isConfirmed){
        fn();
}
});
}

export default confirmToast;
