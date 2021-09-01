import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome,
    faArrowCircleLeft,
    faInfoCircle,
    faEnvelope,
    faPhoneSquare,
    faMapMarkerAlt,
    faAddressCard,
    faUser,
    faLock,
    faUnlock,
    faEllipsisH,
    faListAlt,
    faKey,
    faEye,
    faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faHome, faArrowCircleLeft, faInfoCircle, faEnvelope, faPhoneSquare, faMapMarkerAlt, faAddressCard,
            faUser, faLock, faUnlock, faEllipsisH, faListAlt, faKey, faEye, faEyeSlash);

Vue.component('font-awesome-icon', FontAwesomeIcon);