import React, { useEffect, useState } from 'react';
import Button from '../../../components/Button';
import Table from '../../../components/Table';
import Modal from '../../../components/Modal';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import AuthActions from '../../../store/actions/auth-actions';
import { useForm } from 'react-hook-form';
const Editor = ({ placeholder, senderData, editorHtml, setEditorHtml }) => {
  console.log(senderData, "profileDataprofileData")
  const [theme, setTheme] = useState('snow');
  const handleChange = (html) => {
    setEditorHtml(html);
  };
  const handleThemeChange = (newTheme) => {
    if (newTheme === "core") newTheme = null;
    setTheme(newTheme);
  };



  return (
    <div className="bg-white dark:bg-darkBg dark:text-white sm:h-[55vh]">
      <ReactQuill
        theme={theme}
        onChange={handleChange}
        value={editorHtml}
        modules={Editor.modules}
        formats={Editor.formats}
        bounds={'.app'}
        placeholder={placeholder}
        style={{ height: 'calc(100% - 4rem)' }} // Calculate height dynamically
      />
    </div>
  );
};
Editor.modules = {
  toolbar: [
    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' },
    { 'indent': '-1' }, { 'indent': '+1' }],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  }
};

Editor.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
];

Editor.propTypes = {
  placeholder: PropTypes.string,
  senderData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
  }).isRequired,
};

const SendEmail = () => {
  const [modalOpen, setmodalOpen] = useState(false);
  const [modalBody, setmodalBody] = useState("");
  const [sendTo, setsendTo] = useState("");
  const [sendSubject, setsendSubject] = useState("");
  const [dataa, setdataa] = useState({
    "to": "",
    "subject": "",
    "msg": ""
  });


  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();





  // Function to handle changes in the sendTo field
  const handleSendToChange = (event) => {
    // alert(event.target.value)
    setsendTo(event.target.value);

    setValue("to", event.target.value)
    setdataa(prev => {

      console.log(prev, "prevprevprev")
      return { ...prev, ["to"]: event.target.value }
    })
  };

  // Function to handle changes in the sendSubject field
  const handleSendSubjectChange = (event) => {
    setsendSubject(event.target.value);
    setValue("from", event.target.value)
    setdataa(prev => {

      return { ...prev, ["subject"]: event.target.value }
    })
  };

  let profileData = useSelector((state) => {
    let completeData = state?.auth?.profile;
    return completeData
  })

  const dispatch = useDispatch()

  // Define sender data
  const senderData = {
    name: 'XYZ,',
    position: 'XYZ Developer,',
    company: 'XYZ Company,',
    website: 'https://www.fourbrick.com/',
    logo: '../../../logo.png',
  };



  // useEffect(() => {
  //   dispatch(AuthActions.profile());
  // }, []);





  const [editorHtml, setEditorHtml] = useState(`
    <pre>
    
    
    
    
    
    
    
    </pre>
    <p>Regards</p>
    <p>${senderData?.name || ""} ${senderData?.surname || ""}</p>
    <p>${senderData?.position || ""}</p>
    <p>${senderData?.company || ""}</p>
    <p>${senderData?.mobile || ""}</p>
    <p><a href="${senderData.website}">${senderData.website}</a></p>
    <img src="${senderData.logo}" alt="Logo"/>
  `);


  const sendingMail = (dat) => {



    dat["msg"] = editorHtml
    // dataa["subjecta"]=sendSubject
    // dataa["toa"]=sendTo

    // setdataa()
    console.log(dat, "sendTosendTosendTosendTo")

    dispatch(AuthActions.sendMail(dat, () => setmodalOpen(false)))
  }





  const handleModalButtonClick = () => {
    setmodalBody(
      <div className='dark:bg-darkBg dark:text-white'>
        <div className='flex'>
          <span className='mx-2 font-poppins'>To</span>
          <input className='w-full outline-0 dark:bg-darkBg dark:text-white font-poppins' name='sendTo' defaultValue={sendTo} type="text" onChange={handleSendToChange} />
        </div>
        <hr className='py-2' />
        <div className='flex'>
          <span className='mx-2 font-poppins'>Subject</span>
          <input className='w-full outline-0 dark:bg-darkBg dark:text-white font-poppins' name='sendSubject' defaultValue={sendSubject} type="text" onChange={handleSendSubjectChange} />
        </div>
        <hr className='py-2' />
        <Editor placeholder={'Type your message...'} senderData={{ ...senderData, ...profileData }} editorHtml={editorHtml} setEditorHtml={setEditorHtml} />
        <div className="my-4">
          <Button onClick={handleSubmit(sendingMail)} classes='w-[100px] rounded-full float-right my-auto' name={"Send"}></Button>
        </div>
      </div>
    );
    setmodalOpen(prev => !prev);
  };

  return (
    <div className='p-4'>
      {/* compass Container */}
      <div className="flex py-8 px-8 justify-between">
        <div className='order-last'>
          <Button onClick={handleModalButtonClick} name={"Compose ? "}></Button>
        </div>
        <div></div>
      </div>
      {/* table section */}
      <div className=''>
        <Table classes='' headers={[]} columns={[["Subject", "Created On", "Sent By", "Send Status", "Sent", "Email Opened"]]} commonCols={false} />
      </div>
      <div className='float-right pt-10 pe-5'>
        &lt; &nbsp;&nbsp; 1 &nbsp;&nbsp; &gt;
      </div>
      <Modal size={"xl"} modalHead={"New Message"} children={modalBody} isOpen={modalOpen} setIsOpen={setmodalOpen} />
    </div>
  );
};

export default SendEmail;
