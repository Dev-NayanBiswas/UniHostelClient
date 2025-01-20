import Swal from "sweetalert2";
import './sweetAler.css'
import Toast from "./sweetToast";

function confirmToast(fn){
    const messages = {
        title1:"Sure you want to Update?",
        title2:"Updated Successfully",
        text1:'Update will Change the review',
        btnText:'Update',
        icon:'question',
        icon2:'success',
    }

    const {title1, title2, text1, btnText, icon, icon2} = messages || {}

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
          Toast.fire({
    icon: icon2,
    title: title2
  })
}
});
}

export default confirmToast;
