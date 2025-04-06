import { ArrowLeft, FileTextIcon, LucideDownloadCloud } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { UserContext } from "../../components/js/UserContext";
import { getInitials } from "../../components/js/helper";
function DocumentCard({ name, url }) {
    return (
        <div className="document-card flex algin-items-cen flex-wrap">
            <div className="file-icon-con">

                <FileTextIcon />
            </div>
            <div className="text-box">
                <h4>{name}</h4>
            </div>
            <a download={true} href={url}>
                <LucideDownloadCloud />
                Download</a>

        </div>
    )
}
function Row({ title, value }) {
    return (
        <div className="flex profile-row">
            <p className='caption'>{title}</p>
            <p className="">{value}</p>
        </div>
    )
}
export function EachStudentPage() {
    const [searchParams] = useSearchParams();
    const requested_matric_no = searchParams.get('id');
    const { StudentsData } = useContext(UserContext);
    const [student, setStudent] = useState({})

    useEffect(() => {
        const stud = StudentsData?.find(({ matric_no }) => matric_no === requested_matric_no) || {}
        setStudent(stud)
    }, [StudentsData, requested_matric_no])
    return (
        <div className="page EachStudentPage">
            <Link to='/admin/students' className="btn-to-student-page-btn"> <ArrowLeft /> Back to Students</Link>
            <main className="flex-wrap container">
                <section className="flex fd-column algin-items-cen profile-box">
                    <div className="avatar">
                        {student.profile_pic ? <img src={student.profile_pic} alt="profile" /> : <p>{getInitials(student.name)}</p>}
                    </div>
                    <h3>{student.name}</h3>
                    <p className="caption">{student.matric_no}</p>
                    <div>{student.status}</div>
                    <div className="info-box width100per">
                        <Row title='Email:' value={student.email} />
                        <Row title='Level:' value={student.level} />
                        <Row title='Room:' value={student.room} />
                    </div>
                </section>
                <section className="documents-section flex-spread">
                    <h3>Verification Documents</h3>
                    <p className="caption">Review the documents uploaded by the student for verification</p>
                    <div className="docs-box">
                        {student.pdfs?.map((each_doc) => <DocumentCard name={each_doc.name} url={each_doc.url} />)}
                    </div>
                </section>
            </main>
        </div>
    )
}

// payments = { student.payments }