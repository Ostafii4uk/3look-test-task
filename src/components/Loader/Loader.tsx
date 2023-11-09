import Styles from './Loader.module.css'

const Loader: React.FC<{}> = ({}) => {
  return (
    <div className={Styles.loader}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

export default Loader