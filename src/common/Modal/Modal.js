import React from 'react';

import Backdrop from '../Backdrop/Backdrop';

import styles from './Modal.css';

const Modal = props => {
    let submitBtn = null,
        closeSymbol = null;
    if (props.submit)
        submitBtn = (
            <button
                onClick={props.clicked}
                className={[styles.submit, 'submitFeed', props.enable].join(' ')}
            >
                {props.submitText || 'Submit'}
            </button>
        );

    let classes = [styles.modal, styles.hideModal, props.clsName];
    if (props.show) classes.push(styles.showModal);
    if (props.closeSymbol)
        closeSymbol = (
            <span onClick={props.cancel} className={styles.closeSymbol}>
                &#x2715;
            </span>
        );

    return (
        <>
            <Backdrop show={props.show} dismiss={props.hide} />
            <div style={props.modalStyle} className={classes.join(' ')}>
                <div
                    style={props.modalHeaderStyle}
                    className={styles.modalHeader}>
                    <p style={props.headerStyle}>{props.header}</p>
                    <div>{closeSymbol}</div>
                </div>
                <div className={styles.modalBody} style={props.bodyStyle}>
                    {props.body}
                    {props.dismissText && (
                        <div className={styles.btnSec}>
                            <button
                                className={styles.cancel}
                                onClick={props.cancel}
                            >
                                {props.dismissText}
                            </button>
                            {submitBtn}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Modal;