import Swal from "sweetalert2";
import './sweetAler.css'

const Toast =  Swal.mixin({
    toast: true,
    position: 'top',
    iconColor: 'white',
    customClass: {
      popup: 'colored-toast',
    },
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  })

export default Toast;


//   Toast.fire({
//     icon: "success",
//     title: "Signed in successfully"
//   });

// success	
// error	
// warning	
// info	
// question