import Styles from './Dialog.module.css'
import deleteIcon from '../../../public/assets/svgs/delete-white.svg'
import closeIcon from '../../../public/assets/svgs/close.svg'
import Image from 'next/image'

const Dialog: React.FC<{closeFnc: Function, submitFnc: Function}> = ({closeFnc, submitFnc}) => {
  return (
    <div className={Styles.dialog}>
      <div className={Styles.dialogWrapper}>
        <h3 className={Styles.title}>Delete the Category?</h3>
        <p className={Styles.description}>All templates in the category will be moved to the category "Other"</p>
        <button onClick={() => submitFnc()} className={Styles.deleteButton}>
          <Image src={deleteIcon} alt='delet-icon' />
          Delete
        </button>
        <button onClick={() => closeFnc()} className={Styles.cancelButton}>Cancel</button>
        <Image onClick={() => closeFnc()} className={Styles.closeIcon} src={closeIcon} alt='close-icon'/>
      </div>
    </div>
  )
}

export default Dialog