import React, { useState, useRef } from 'react';
import style from './MyProfile.module.css';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { VscSignOut } from 'react-icons/vsc';
import MyProfileReduxFormData from './MyProfileReduxFormData';
import { savePhoto, updateUserName } from '../../../../Redux/reducer/Auth-reducer';
import userIcon from '../../../../Assets/Images/userIcon.png';
import logo from '../../../../Assets/Images/logo.png';
import Loading from './../../../common/Loading/Loading';




const MyProfileContainer = React.memo((props) => {

  const [profileImage, setProfileImage] = useState(props.userPhoto ? `http://localhost:5000/${props.userPhoto}` : userIcon)
  const [editMode, setEditMode] = useState(false)


  let currentImage = useRef()
  const onChangeProfilePhotos = (e) => {
    if (e.target.files.length) {
      currentImage.current = e.target.files[0]
      let reader = new FileReader()
      reader.onload = (e) => {
        setProfileImage(e.target.result)
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }


  const onSubmit = (newUserData) => {
    props.updateUserName(newUserData.userName)
    props.savePhoto(currentImage.current);
    setEditMode(!editMode)
  }
  if (props.isLoading) {
   return <Loading />
  }

  if (!props.isAuth) {
    return <Redirect to='/auth/login' />
  }

  return (
    <div className={style.container}>
      <div className = {style.wrapper}>
      <img src = {logo} alt = 'logo' className = {style.logo}/>
      <span className={style.close} onClick={ () => setEditMode(!editMode)}>{<VscSignOut />}</span>
      <MyProfileReduxFormData  onSubmit={onSubmit}
                               editMode={editMode}
                               onChangeProfilePhotos={onChangeProfilePhotos}
                               profileImage={profileImage}
                               initialValues={{ userName: props.userName }} userPhoto={props.userPhoto}
      />
      </div>
    </div>
  );
})


const mapStateToProps = (state) => {

  return ({
    userName: state.auth.userName,
    userPhoto: state.auth.userPhoto,
    isAuth: state.auth.isAuth,
    isLoading : state.auth.isLoading,
  })
}

export default compose(connect(mapStateToProps, { savePhoto, updateUserName }))(MyProfileContainer)



