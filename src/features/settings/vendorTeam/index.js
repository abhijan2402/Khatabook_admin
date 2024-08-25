import moment from "moment"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import TitleCard from "../../../components/Cards/TitleCard"
import { showNotification } from '../../common/headerSlice'

const TopSideButtons = () => {

    const dispatch = useDispatch()

    const addNewTeamMember = () => {
        dispatch(showNotification({ message: "Add New Member clicked", status: 1 }))
    }

    return (
        <div className="inline-block float-right">
            <button className="btn px-6 btn-sm normal-case btn-primary" onClick={() => addNewTeamMember()}>Invite New</button>
        </div>
    )
}



const TEAM_MEMBERS = [
    { name: "Alex", avatar: "https://reqres.in/img/faces/1-image.jpg", email: "alex@dashwind.com", role: "Owner", joinedOn: moment(new Date()).add(-5 * 1, 'days').format("DD MMM YYYY"), lastActive: "5 hr ago" },
    { name: "Ereena", avatar: "https://reqres.in/img/faces/2-image.jpg", email: "ereena@dashwind.com", role: "Admin", joinedOn: moment(new Date()).add(-5 * 2, 'days').format("DD MMM YYYY"), lastActive: "15 min ago" },
    { name: "John", avatar: "https://reqres.in/img/faces/3-image.jpg", email: "jhon@dashwind.com", role: "Admin", joinedOn: moment(new Date()).add(-5 * 3, 'days').format("DD MMM YYYY"), lastActive: "20 hr ago" },
    { name: "Matrix", avatar: "https://reqres.in/img/faces/4-image.jpg", email: "matrix@dashwind.com", role: "Manager", joinedOn: moment(new Date()).add(-5 * 4, 'days').format("DD MMM YYYY"), lastActive: "1 hr ago" },
    { name: "Virat", avatar: "https://reqres.in/img/faces/5-image.jpg", email: "virat@dashwind.com", role: "Support", joinedOn: moment(new Date()).add(-5 * 5, 'days').format("DD MMM YYYY"), lastActive: "40 min ago" },
    { name: "Miya", avatar: "https://reqres.in/img/faces/6-image.jpg", email: "miya@dashwind.com", role: "Support", joinedOn: moment(new Date()).add(-5 * 7, 'days').format("DD MMM YYYY"), lastActive: "5 hr ago" },

]

function VendorTeam() {


    const [members, setMembers] = useState(TEAM_MEMBERS)


    const getRoleComponent = (role) => {
        if (role === "Admin") return <div className="badge badge-secondary">{role}</div>
        if (role === "Manager") return <div className="badge">{role}</div>
        if (role === "Owner") return <div className="badge badge-primary">{role}</div>
        if (role === "Support") return <div className="badge badge-accent">{role}</div>
        else return <div className="badge badge-ghost">{role}</div>
    }
    const FetchAPi = async () => {
        console.log('====================================');
        console.log("hiiii");
        console.log('====================================');

        try {
            const response = await fetch('http://192.168.22.185:3000/api/admin/get-all-venders');

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data?.response?.customers, "DATATTAT");
            setMembers(data?.response?.customers)
            // setData(data); // Uncomment if you are using state to store the fetched data
            // setLoading(false); // Uncomment if you have a loading state

        } catch (error) {
            console.log(error);
            // setError(error); // Uncomment if you are using state to handle errors
            // setLoading(false); // Uncomment if you have a loading state
        }
    };
    useEffect(() => {
        FetchAPi()
    }, [])


    return (
        <>
            <TitleCard title="Vendor list" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>

                {/* Team Member list in table format loaded constant */}
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email Id</th>
                                <th>created On</th>
                                <th>Address</th>
                                <th>Phone Number</th>
                                <th>Shop Name</th>
                                <th>Subscription type</th>
                                <th>Subscription Expiry date</th>
                                <th>Category</th>
                                <th>Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                members.map((l, k) => {
                                    return (
                                        <tr key={k}>
                                            <td>
                                                <div className="flex items-center space-x-3">
                                                    <div>
                                                        <div className="font-bold">{l.name}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{l.email}</td>
                                            <td>{moment(l.createdAt).format("YYYY-MM-DD HH:MM ")}</td>
                                            <td>{l.address}</td>
                                            <td>{l.phoneNumber}</td>
                                            <td>{l.shopId?.ownerName}</td>
                                            <td>{l.shopId?.subscriptionType}</td>
                                            <td>{moment(l.shopId?.subExpireDate).format("YYYY-MM-DD HH:MM ")}</td>
                                            <td>{l.shopId?.category}</td>
                                            <td>{l.shopId?.ratings}</td>

                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </TitleCard>
        </>
    )
}


export default VendorTeam