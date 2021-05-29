import React from 'react';

import styles from './FighterBodyImg.scss';

const FighterBodyImg = props => {
    let strikes = Object.keys(props.strikes).map(key => {
        let obj = {};
        obj[key] = props.strikes[key].strike;
        return obj;
    }, {});

    let absorbed = Object.keys(props.strikes).map(key => {
        let obj = {};
        obj[key] = props.strikes[key].absorb;
        return obj;
    }, {});

    
    const reorder = list => {
        let arr = [...list];
        let temp = arr[1];
        arr[1] = arr[2];
        arr[2] = temp;
        return arr;
    }

    const createGradientElement = list => {
        return list.map(obj => {
            let color, startPer, endPer;
            let key = Object.keys(obj)[0];
            switch(key) {
                case 'head': {
                    color = '#DC3545';
                    startPer = 0;
                    endPer = obj[key];
                    break;
                }
                case 'torso': {
                    color = '#FFC107';
                    startPer = obj[key];
                    endPer = 100 - list[2][Object.keys(list[2])[0]];
                    break;
                }
                case 'legs': {
                    color = '#28A745'; 
                    startPer = 100 - obj[key];
                    endPer = 100;
                    break;
                }
            }
            return (
                <React.Fragment key={Object.keys(obj)[0]}>
                    <stop 
                        offset={`${startPer}%`} 
                        style={{stopColor: color,stopOpacity:1}} />
                    <stop 
                        offset={`${endPer}%`} 
                        style={{stopColor: color,stopOpacity:1}} />
                </React.Fragment>
            )
        })
    }

    const createTextElement = list => {
        return list.map(obj => {
            return (
                <div key={Object.keys(obj)[0]}>
                    <span style={{textTransform: 'capitalize'}}>{Object.keys(obj)[0]}: </span>
                    <span>{obj[Object.keys(obj)]} %</span>
                </div>
            )
        })
    }

    strikes = reorder(strikes);
    absorbed = reorder(absorbed);

    let strikeGradientElement = createGradientElement(strikes);
    let strikeTextElement = createTextElement(strikes);
    let absorbGradientElement = createGradientElement(absorbed);
    let absorbTextElement = createTextElement(absorbed);

    return (
        <div className={styles.fighterBodyImgContainer}>
            <div className={styles.imgStatContainer}>
                <p>Strikes landed on oppponent body</p>
                <div className={styles.svgDiv}>
                    <svg x="0px" y="0px" viewBox="0 0 837.483 1819.369" enableBackground="new 0 0 837.483 1819.369">
                        <defs>
                            <linearGradient id="solids" gradientTransform="rotate(90)">
                                {strikeGradientElement}
                            </linearGradient>
                        </defs>
                        <path 
                            fill="url('#solids')"
                            d="M736.728,849.786c-0.634-1.435-13.566-15.425-33.487-23.292c-4.568-1.94-4.545,2.705-16.944-34.925
                            c-26.957-72.647-5.661-112.736-51.135-200.791c-6.888-14.322-9.901-24.921-16.16-50.12c-25.397-104.478-6.032-90.98-15.87-135.251
                            c-17.961-63.049-50.754-59.498-71.782-59.155c-16.944,0.378-45.224-11.699-52.936-19.746
                            c-10.555-11.486-17.912-20.548-11.679-58.855c0,0,7.037-12.141,9.078-34.125c9.284,11.287,24.572-33.84,16.065-42.691
                            c-1.745-1.867-5.169-1.236-6.289,1.015c-1.292,1.484-1.315,3.695-2.888,4.964c-2-9.359,3.289-28.498-7.935-56.968
                            c-5.541-12.289-11.235-15.496-21.547-22.44c-8.401-6.048-28.842-7.595-29.842-7.717h-9.461c-1,0.122-21.441,1.669-29.842,7.717
                            c-10.312,6.944-16.006,10.151-21.547,22.44c-11.224,28.47-5.935,47.609-7.935,56.968c-1.573-1.269-1.596-3.48-2.888-4.964
                            c-1.12-2.251-4.544-2.882-6.289-1.015c-8.507,8.851,6.781,53.978,16.065,42.691c2.041,21.984,9.078,34.125,9.078,34.125
                            c6.233,38.307-1.124,47.369-11.679,58.855c-7.712,8.047-35.992,20.124-52.935,19.746c-21.029-0.343-53.822-3.894-71.782,59.155
                            c-9.838,44.271,9.527,30.773-15.87,135.251c-6.259,25.199-9.272,35.798-16.16,50.12c-45.474,88.055-24.178,128.144-51.135,200.791
                            c-12.399,37.63-12.376,32.985-16.944,34.925c-19.921,7.867-32.853,21.857-33.487,23.292c-8.923,20.454-23.328,27.412-19.921,33.844
                            c0.896,1.702,3.318,2.588,4.944,1.381c5.189,0.91,12.738-4.808,16.127-8.599c4.102-4.706,3.375-7.457,11.332-13.86
                            c1.824,2.047-2.155,20.335-3.12,23.398c-4.877,14.729-26.567,49.619-17.595,54.417c0.945,0.4,2.227,0.955,3.073,0.089
                            c1.553-1.53,3.53-2.604,4.841-4.372c8.025-10.218,17.566-34.36,24.059-39.238c3.279,0.224,1.596,2.346-4.475,22.532
                            c-3.673,13.084-5.142,19.941-5.142,19.941c-10.126,30.466,6.229,25.716,11.501,6.808c0.448-1.537,9.722-26.912,10.129-28.16
                            c1.241-3.291,4.602-17.806,8.801-14.872c0.646,2.469-0.335,3.044-3.536,31.521c-2.6,21.813-3.236,8.789-2.713,26.425
                            c0.079,2.164,4.439,3.257,6.282,2.115c10.539-9.723,12.692-57.611,18.074-61.022c3.669,4.293,4.272,33.754,5.982,39.221
                            c2.652,9.705,7.446,4.802,7.981,3.239c3.825-9.324-0.19-30.536,0.628-45.388c0,0,4.369-14.53,7.198-38.676
                            c4.176-45.514-17.861,13.267,48.59-167.185c0,0,5.299-10.218,13.794-30.791c9.81-21.31,5.988-35.652,19.766-73.451
                            c0.361-1,16.239-47.758,24.363-68.15c45.673,232.645-9.743,77.068-28.904,331.531c-5.708,105.042,1.862,76.707,18.19,223.544
                            c31.719,289.304-15.087,130.161,35.652,384.312c10.99,51.495,9.837,44.86,11.854,56.284c2.28,21.363-1.788,21.528-1.679,31.313
                            c-0.699,24.031,5.964,8.574-1.712,52.53c-4.993,24.181-4.913,9.214-7.677,37.417c-3.463,13.977-13.912,52.732,0.856,52.45
                            c1.286,7.64,5.541,9.156,9.756,6.712c-0.684,2.455,1.381,4.293,2.766,6.011c4.813,1.322,4.76,1.029,6.828-0.555
                            c1.495,5.791,5.173,5.742,6.748,6.16c4.768,1.476,5.904-11.237,6.781-16.16c0.856-0.046,1.705-0.096,2.551-0.129
                            c-1.072,3.151-7.161,15.833,2.634,16.835c7.651,1.238,8.542,0.168,12.727-3.791c6.992-7.01,5.41-8.94,6.623-20.685
                            c0.191-2.384,5.685-6.58,0.872-37.642c-1.855-15.952-0.832,2.69,0.304-35.715c0.371-16.594,5.685-19.576,6.408-31.349
                            c-6.493-27.396-1.465-14.55-4.045-30.51c-6.145-34.313-7.105-27.255,0.575-107.316c6.987-65.839,14.147-68.677,7.72-136.864
                            c-14.296-110.15-0.224-68.945,1.451-126.216c1.503-67.36-4.198-108.808,3.103-168.203c4.314-34.735,12.351-68.835,12.215-90.227
                            c2.948-3.639,4.984-7.885,7.168-11.993c3.172-6.203,2.655-0.513,2.627-35.675c1.424-0.218,2.885-0.281,4.27-0.677
                            c0.162-0.334,0.307-0.661,0.436-0.985c0.007,0.007,0.014,0.015,0.022,0.023c0.008-0.008,0.015-0.016,0.022-0.023
                            c0.129,0.324,0.274,0.651,0.436,0.985c1.385,0.396,2.846,0.459,4.27,0.677c-0.028,35.162-0.545,29.472,2.627,35.675
                            c2.184,4.108,4.22,8.354,7.168,11.993c-0.136,21.392,7.901,55.493,12.215,90.227c7.301,59.394,1.6,100.842,3.103,168.203
                            c1.675,57.27,15.747,16.066,1.451,126.216c-6.427,68.186,0.733,71.025,7.72,136.864c7.68,80.061,6.72,73.003,0.575,107.316
                            c-2.58,15.96,2.448,3.114-4.045,30.51c0.723,11.773,6.037,14.755,6.408,31.349c1.136,38.405,2.159,19.763,0.304,35.715
                            c-4.813,31.062,0.681,35.258,0.872,37.642c1.213,11.745-0.369,13.675,6.623,20.685c4.185,3.959,5.076,5.029,12.727,3.791
                            c9.795-1.002,3.706-13.684,2.634-16.835c0.846,0.033,1.695,0.083,2.551,0.129c0.877,4.923,2.013,17.636,6.781,16.16
                            c1.575-0.418,5.253-0.369,6.748-6.16c2.068,1.584,2.015,1.877,6.828,0.555c1.385-1.718,3.45-3.556,2.766-6.011
                            c4.215,2.444,8.47,0.928,9.756-6.712c14.768,0.282,4.319-38.473,0.856-52.45c-2.764-28.203-2.684-13.236-7.677-37.417
                            c-7.676-43.956-1.013-28.499-1.712-52.53c0.109-9.785-3.959-9.95-1.679-31.313c2.017-11.424,0.864-4.789,11.854-56.284
                            c50.739-254.151,3.933-95.007,35.652-384.312c16.328-146.837,23.898-118.502,18.19-223.544
                            c-19.161-254.463-74.576-98.886-28.904-331.531c8.124,20.392,24.002,67.15,24.363,68.15c13.778,37.8,9.956,52.142,19.766,73.451
                            c8.495,20.573,13.794,30.791,13.794,30.791c66.451,180.451,44.414,121.671,48.59,167.185c2.829,24.146,7.198,38.676,7.198,38.676
                            c0.818,14.852-3.197,36.064,0.628,45.388c0.535,1.563,5.329,6.466,7.981-3.239c1.71-5.467,2.313-34.928,5.982-39.221
                            c5.382,3.411,7.535,51.3,18.074,61.022c1.843,1.142,6.203,0.049,6.282-2.115c0.523-17.636-0.113-4.612-2.713-26.425
                            c-3.201-28.477-4.182-29.052-3.536-31.521c4.199-2.934,7.56,11.581,8.801,14.872c0.407,1.248,9.681,26.623,10.129,28.16
                            c5.272,18.908,21.627,23.658,11.501-6.808c0,0-1.469-6.857-5.142-19.941c-6.071-20.186-7.754-22.308-4.475-22.532
                            c6.493,4.878,16.034,29.02,24.059,39.238c1.311,1.768,3.288,2.842,4.841,4.372c0.846,0.866,2.128,0.311,3.073-0.089
                            c8.972-4.798-12.718-39.688-17.595-54.417c-0.965-3.063-4.944-21.351-3.12-23.398c7.957,6.403,7.23,9.154,11.332,13.86
                            c3.389,3.791,10.938,9.509,16.127,8.599c1.626,1.207,4.048,0.321,4.944-1.381C760.056,877.198,745.651,870.24,736.728,849.786z"/>
                    </svg>
                    <div className={styles.textElement}>
                        {strikeTextElement}
                    </div>
                </div>
            </div>
            <div className={styles.imgStatContainer}>
                <p>Strikes absorbed by {props.fighter}</p>
                <div className={styles.svgDiv}>
                    <svg x="0px" y="0px" viewBox="0 0 837.483 1819.369" enableBackground="new 0 0 837.483 1819.369">
                        <defs>
                            <linearGradient id="absorb" gradientTransform="rotate(90)">
                                {absorbGradientElement}
                            </linearGradient>
                        </defs>
                        <path 
                            fill="url('#absorb')"
                            d="M736.728,849.786c-0.634-1.435-13.566-15.425-33.487-23.292c-4.568-1.94-4.545,2.705-16.944-34.925
                            c-26.957-72.647-5.661-112.736-51.135-200.791c-6.888-14.322-9.901-24.921-16.16-50.12c-25.397-104.478-6.032-90.98-15.87-135.251
                            c-17.961-63.049-50.754-59.498-71.782-59.155c-16.944,0.378-45.224-11.699-52.936-19.746
                            c-10.555-11.486-17.912-20.548-11.679-58.855c0,0,7.037-12.141,9.078-34.125c9.284,11.287,24.572-33.84,16.065-42.691
                            c-1.745-1.867-5.169-1.236-6.289,1.015c-1.292,1.484-1.315,3.695-2.888,4.964c-2-9.359,3.289-28.498-7.935-56.968
                            c-5.541-12.289-11.235-15.496-21.547-22.44c-8.401-6.048-28.842-7.595-29.842-7.717h-9.461c-1,0.122-21.441,1.669-29.842,7.717
                            c-10.312,6.944-16.006,10.151-21.547,22.44c-11.224,28.47-5.935,47.609-7.935,56.968c-1.573-1.269-1.596-3.48-2.888-4.964
                            c-1.12-2.251-4.544-2.882-6.289-1.015c-8.507,8.851,6.781,53.978,16.065,42.691c2.041,21.984,9.078,34.125,9.078,34.125
                            c6.233,38.307-1.124,47.369-11.679,58.855c-7.712,8.047-35.992,20.124-52.935,19.746c-21.029-0.343-53.822-3.894-71.782,59.155
                            c-9.838,44.271,9.527,30.773-15.87,135.251c-6.259,25.199-9.272,35.798-16.16,50.12c-45.474,88.055-24.178,128.144-51.135,200.791
                            c-12.399,37.63-12.376,32.985-16.944,34.925c-19.921,7.867-32.853,21.857-33.487,23.292c-8.923,20.454-23.328,27.412-19.921,33.844
                            c0.896,1.702,3.318,2.588,4.944,1.381c5.189,0.91,12.738-4.808,16.127-8.599c4.102-4.706,3.375-7.457,11.332-13.86
                            c1.824,2.047-2.155,20.335-3.12,23.398c-4.877,14.729-26.567,49.619-17.595,54.417c0.945,0.4,2.227,0.955,3.073,0.089
                            c1.553-1.53,3.53-2.604,4.841-4.372c8.025-10.218,17.566-34.36,24.059-39.238c3.279,0.224,1.596,2.346-4.475,22.532
                            c-3.673,13.084-5.142,19.941-5.142,19.941c-10.126,30.466,6.229,25.716,11.501,6.808c0.448-1.537,9.722-26.912,10.129-28.16
                            c1.241-3.291,4.602-17.806,8.801-14.872c0.646,2.469-0.335,3.044-3.536,31.521c-2.6,21.813-3.236,8.789-2.713,26.425
                            c0.079,2.164,4.439,3.257,6.282,2.115c10.539-9.723,12.692-57.611,18.074-61.022c3.669,4.293,4.272,33.754,5.982,39.221
                            c2.652,9.705,7.446,4.802,7.981,3.239c3.825-9.324-0.19-30.536,0.628-45.388c0,0,4.369-14.53,7.198-38.676
                            c4.176-45.514-17.861,13.267,48.59-167.185c0,0,5.299-10.218,13.794-30.791c9.81-21.31,5.988-35.652,19.766-73.451
                            c0.361-1,16.239-47.758,24.363-68.15c45.673,232.645-9.743,77.068-28.904,331.531c-5.708,105.042,1.862,76.707,18.19,223.544
                            c31.719,289.304-15.087,130.161,35.652,384.312c10.99,51.495,9.837,44.86,11.854,56.284c2.28,21.363-1.788,21.528-1.679,31.313
                            c-0.699,24.031,5.964,8.574-1.712,52.53c-4.993,24.181-4.913,9.214-7.677,37.417c-3.463,13.977-13.912,52.732,0.856,52.45
                            c1.286,7.64,5.541,9.156,9.756,6.712c-0.684,2.455,1.381,4.293,2.766,6.011c4.813,1.322,4.76,1.029,6.828-0.555
                            c1.495,5.791,5.173,5.742,6.748,6.16c4.768,1.476,5.904-11.237,6.781-16.16c0.856-0.046,1.705-0.096,2.551-0.129
                            c-1.072,3.151-7.161,15.833,2.634,16.835c7.651,1.238,8.542,0.168,12.727-3.791c6.992-7.01,5.41-8.94,6.623-20.685
                            c0.191-2.384,5.685-6.58,0.872-37.642c-1.855-15.952-0.832,2.69,0.304-35.715c0.371-16.594,5.685-19.576,6.408-31.349
                            c-6.493-27.396-1.465-14.55-4.045-30.51c-6.145-34.313-7.105-27.255,0.575-107.316c6.987-65.839,14.147-68.677,7.72-136.864
                            c-14.296-110.15-0.224-68.945,1.451-126.216c1.503-67.36-4.198-108.808,3.103-168.203c4.314-34.735,12.351-68.835,12.215-90.227
                            c2.948-3.639,4.984-7.885,7.168-11.993c3.172-6.203,2.655-0.513,2.627-35.675c1.424-0.218,2.885-0.281,4.27-0.677
                            c0.162-0.334,0.307-0.661,0.436-0.985c0.007,0.007,0.014,0.015,0.022,0.023c0.008-0.008,0.015-0.016,0.022-0.023
                            c0.129,0.324,0.274,0.651,0.436,0.985c1.385,0.396,2.846,0.459,4.27,0.677c-0.028,35.162-0.545,29.472,2.627,35.675
                            c2.184,4.108,4.22,8.354,7.168,11.993c-0.136,21.392,7.901,55.493,12.215,90.227c7.301,59.394,1.6,100.842,3.103,168.203
                            c1.675,57.27,15.747,16.066,1.451,126.216c-6.427,68.186,0.733,71.025,7.72,136.864c7.68,80.061,6.72,73.003,0.575,107.316
                            c-2.58,15.96,2.448,3.114-4.045,30.51c0.723,11.773,6.037,14.755,6.408,31.349c1.136,38.405,2.159,19.763,0.304,35.715
                            c-4.813,31.062,0.681,35.258,0.872,37.642c1.213,11.745-0.369,13.675,6.623,20.685c4.185,3.959,5.076,5.029,12.727,3.791
                            c9.795-1.002,3.706-13.684,2.634-16.835c0.846,0.033,1.695,0.083,2.551,0.129c0.877,4.923,2.013,17.636,6.781,16.16
                            c1.575-0.418,5.253-0.369,6.748-6.16c2.068,1.584,2.015,1.877,6.828,0.555c1.385-1.718,3.45-3.556,2.766-6.011
                            c4.215,2.444,8.47,0.928,9.756-6.712c14.768,0.282,4.319-38.473,0.856-52.45c-2.764-28.203-2.684-13.236-7.677-37.417
                            c-7.676-43.956-1.013-28.499-1.712-52.53c0.109-9.785-3.959-9.95-1.679-31.313c2.017-11.424,0.864-4.789,11.854-56.284
                            c50.739-254.151,3.933-95.007,35.652-384.312c16.328-146.837,23.898-118.502,18.19-223.544
                            c-19.161-254.463-74.576-98.886-28.904-331.531c8.124,20.392,24.002,67.15,24.363,68.15c13.778,37.8,9.956,52.142,19.766,73.451
                            c8.495,20.573,13.794,30.791,13.794,30.791c66.451,180.451,44.414,121.671,48.59,167.185c2.829,24.146,7.198,38.676,7.198,38.676
                            c0.818,14.852-3.197,36.064,0.628,45.388c0.535,1.563,5.329,6.466,7.981-3.239c1.71-5.467,2.313-34.928,5.982-39.221
                            c5.382,3.411,7.535,51.3,18.074,61.022c1.843,1.142,6.203,0.049,6.282-2.115c0.523-17.636-0.113-4.612-2.713-26.425
                            c-3.201-28.477-4.182-29.052-3.536-31.521c4.199-2.934,7.56,11.581,8.801,14.872c0.407,1.248,9.681,26.623,10.129,28.16
                            c5.272,18.908,21.627,23.658,11.501-6.808c0,0-1.469-6.857-5.142-19.941c-6.071-20.186-7.754-22.308-4.475-22.532
                            c6.493,4.878,16.034,29.02,24.059,39.238c1.311,1.768,3.288,2.842,4.841,4.372c0.846,0.866,2.128,0.311,3.073-0.089
                            c8.972-4.798-12.718-39.688-17.595-54.417c-0.965-3.063-4.944-21.351-3.12-23.398c7.957,6.403,7.23,9.154,11.332,13.86
                            c3.389,3.791,10.938,9.509,16.127,8.599c1.626,1.207,4.048,0.321,4.944-1.381C760.056,877.198,745.651,870.24,736.728,849.786z"/>
                    </svg>
                    <div className={styles.textElement}>
                        {absorbTextElement}
                    </div>
                </div>
            </div>
        </div>
 
    )
}

export default FighterBodyImg;
