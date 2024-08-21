import { IFormDivision, IFormMemberDivision, IFormFixDivision, IDataDivison, IDataMemberDivision } from './lib/type_division';
import CreateUserDivisionCalender from "./_division_fitur/calender/components/create_user_division_calender";
import UlangiEvent from "./_division_fitur/calender/components/ulangi_event";
import UpdateUlangiEvent from "./_division_fitur/calender/components/update_calander/update_ulangi_event";
import ViewCreateDivisionCalender from "./_division_fitur/calender/view/view_create_division_calender";
import ViewDetailEventDivision from "./_division_fitur/calender/view/view_detail_event_division";
import ViewDivisionCalender from "./_division_fitur/calender/view/view_division_calender";
import ViewHistoryDivisionCalender from "./_division_fitur/calender/view/view_history_division_calender";
import ViewUpdateDivisionCalender from "./_division_fitur/calender/view/view_update_division_calender";
import CreateAdminDivision from "./ui/create_admin_division";
import CreateUsers from "./ui/create_users";
import ListDivision from './ui/list_division';
import CreateDivision from './ui/create_division';
import NavbarDetailDivision from './ui/navbar_detail_division';
import CarouselDivision from './ui/carousel_division';
import FeatureDetailDivision from './ui/feature_detail_division';
import ListTaskOnDetailDivision from './ui/list_task';
import ListDocumentOnDetailDivision from './ui/list_document';
import ListDiscussionOnDetailDivision from './ui/list_discussion';
import InformationDivision from './ui/information_division';
import CreateAnggotaDivision from './ui/create_anggota_division';
import EditDivision from './ui/edit_division';
import CreateReport from './ui/create_report';
import ReportDivisionId from './ui/report_division_id';
import { funGetDivisionById } from './lib/api_division';

export { CreateUsers };
export { CreateAdminDivision };
export { ViewDivisionCalender };
export { ViewCreateDivisionCalender };
export { UlangiEvent };
export { CreateUserDivisionCalender };
export { ViewHistoryDivisionCalender };
export { ViewDetailEventDivision };
export { ViewUpdateDivisionCalender };
export { UpdateUlangiEvent };
export type { IFormDivision, IFormMemberDivision, IFormFixDivision, IDataDivison, IDataMemberDivision }
export { ListDivision }
export { CreateDivision }
export { NavbarDetailDivision }
export { CarouselDivision }
export { FeatureDetailDivision }
export { ListTaskOnDetailDivision }
export { ListDocumentOnDetailDivision }
export { ListDiscussionOnDetailDivision }
export { InformationDivision }
export { CreateAnggotaDivision }
export { EditDivision }
export { CreateReport }
export { ReportDivisionId }
export { funGetDivisionById }
