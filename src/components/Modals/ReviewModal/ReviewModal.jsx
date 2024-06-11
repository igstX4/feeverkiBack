import s from './ReviewModal.module.scss'

const ReviewModal = ({open, setOpen}) => {


    return (
        <div onClick={() => setOpen(false)} className={`${s.modalBg} ${open ? s.active : ""}`}>
            <div onClick={(e) => e.stopPropagation()} className={s.content}>
                <iframe
                    src="//www.youtube.com/embed/eissYS_Whsg?autoplay=0&loop=0&rel=0&modestbranding=0"
                    style={{
                        left: '0px !important',
                        position: 'absolute !important'
                        // border: '0px',
                        // width: '500px',
                        // height: '300px'
                    }}
                    className={s.iframe}
                />
            </div>
        </div>
    );
};

export default ReviewModal;
