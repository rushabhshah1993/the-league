import React, { useState } from 'react';
import { connect } from 'react-redux';

import styles from './CreatePost.scss';

import {
    addNewArticle
} from './../../../actions/newsActions';
import { cloneDeep } from 'lodash';

const CreatePost = props => {
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [mainImg, setMainImgRef] = useState('');
    const [thumbImg, setThumbImgRef] = useState('');
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [disabled, setDisabled] = useState(false);


    const updateNewsId = newsId => {
        let arr = newsId.split('0');
        let currentId = arr.slice(-1);
        let newId = +currentId+1;
        if(newId.toString().length === +currentId[0].length) {
            return "0".repeat(arr.length-1) + newId;
        } else {
            let difference = +currentId[0].length - newId.toString().length;
            return "0".repeat(difference) + newId;
        }
    }

    const createPostObj = () => {
        if(props.news.length) {
            let news = cloneDeep(props.news);
            let newId = updateNewsId(news.slice(-1)[0].newsId);
            let obj = {
                articleImg: mainImg,
                body: body,
                date: {
                    dateAdded: new Date().toISOString(),
                    dateModified: "none"
                },
                img: thumbImg,
                location: {
                    city: city,
                    country: country
                },
                newsId: newId,
                title: title
            }
            setDisabled(true);
            news.push(obj);
            props.addNewArticle(news);
            setTimeout(() => {
                props.history.push('/articles');
            }, 3000)
        }
    }

    let btnClasses = [styles.createBtn];
    if(disabled) btnClasses.push(styles.disabledBtn);

    return (
        <div className={styles.createPostContainer}>
            <div className={styles.inputItem}>
                <label htmlFor="city">City:</label>
                <input 
                    type="text" 
                    id="city" 
                    name="city"
                    placeholder="Enter the city name"
                    disabled={disabled}
                    onChange={event => setCity(event.target.value)} />
            </div>
            <div className={styles.inputItem}>
                <label htmlFor="country">Country:</label>
                <input 
                    type="text" 
                    id="country" 
                    name="country"
                    placeholder="Enter the country name"
                    disabled={disabled}
                    onChange={event => setCountry(event.target.value)} />
            </div>
            <div className={styles.inputItem}>
                <label htmlFor="main-img-ref">Main Post Image Reference:</label>
                <input 
                    type="text" 
                    id="main-img-ref" 
                    name="main-img-ref"
                    placeholder="Enter the image name reference for the image inside the main post"
                    disabled={disabled}
                    onChange={event => setMainImgRef(event.target.value)} />
            </div>
            <div className={styles.inputItem}>
                <label htmlFor="thumbnail-img-ref">Thumbnail Image Reference:</label>
                <input 
                    type="text" 
                    id="thumbnail-img-ref" 
                    name="thumbnail-img-ref"
                    placeholder="Enter the image name reference for the thumbnail"
                    disabled={disabled}
                    onChange={event => setThumbImgRef(event.target.value)} />
            </div>
            <div className={styles.inputItem}>
                <label htmlFor="title">Title:</label>
                <input 
                    type="text" 
                    id="title" 
                    name="title" 
                    placeholder="Enter the title for the post"
                    disabled={disabled}
                    onChange={event => setTitle(event.target.value)} />
            </div>
            <div className={styles.inputItem}>
                <label htmlFor="content">Content:</label>
                <textarea 
                    type="text" 
                    id="content" 
                    name="content" 
                    rows="10"
                    disabled={disabled}
                    onChange={event => setBody(event.target.value)}>
                </textarea>
            </div>
            <div 
                className={btnClasses.join(' ')}
                onClick={createPostObj}>
                    Create Post
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        news: state.news
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addNewArticle: data => dispatch(addNewArticle(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);
