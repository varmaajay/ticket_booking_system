const Passenger = require('../models/passengers');
const Travel = require('../models/travel')
const fs = require('fs');

const admincontroller = {};
admincontroller.set_up = async (req, res) => {

  res.render('home');
}
admincontroller.pass = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const number = req.body.number;
   const photo = req.file.filename;
  //  console.log(photo)
  const password = req.body.pwd;
  const from = req.body.from;
  const to = req.body.to;
  const seatNo = req.body.seat_no;
  const price = req.body.price;
  const ticket_no = req.body.ticket_no;
  const Bus_no = req.body.Bus_no;
  const Ticket_time = req.body.time;
  const start = req.body.start;

  const end = req.body.end;
  // const file = req.file.originalname;
  // const filename = req.file.photo;
  // console.log(filename, "filenmae");

  // console.log(req.file, "file")

  // file.mv('/upload' + filename, function (err) {
  //   if (err) {
  //     return res.send(err);
  //   } else {
  //     res.send('File uploaded');
  //   }
  // });
  const saveInformation = new Passenger({
    name: name,
    email: email,
    image:photo,
    phone_No: number,
    password: password
  })
  passengerData = await saveInformation.save();


  const saveTravesl = new Travel({
    passenger_ID: passengerData._id,
    from: from,
    To: to,
    seat_No: seatNo,
    rupees: price,
    ticket_No: ticket_no,
    Ticket_time: Ticket_time,
    Bus_No: Bus_no,
    start: start,

    End: end
  })

  const travelData = await saveTravesl.save();

  res.redirect('list');

}
admincontroller.list_setup = async (req, res) => {
  const passenger = await Passenger.find();
  const data = await Travel.aggregate([
    { $match: { delete: null } },
    // { $match: { company_email: company_email } },
    // { $addFields: { roleId: { $toObjectId: "$role_id" } } },
    {
      $lookup: {
        from: "passengers",
        localField: "passenger_ID",
        foreignField: "_id",
        as: "passengerData",
      },
    },
  ]);

  res.render('list', { data, passenger })


}
admincontroller.editByid = async (req, res) => {

  const id = req.params.id
  const Editbyid = await Travel.findById(id)
  const Editbyid1 = await Passenger.findById(Editbyid.passenger_ID)

  res.render('edit', { Editbyid, Editbyid1 });
}
admincontroller.updateByid = async (req, res) => {


  const id = req.params.id

  const updateData = {
    name: req.body.name,
    email: req.body.email,
    phone_No: req.body.number,
    password: req.body.pwd,
    from: req.body.from,
    To: req.body.to,
    seat_No: req.body.seat_no,
    rupees: req.body.price,
    ticket_no: req.body.ticket_no,
    Bus_No: req.body.Bus_no,
    Ticket_time: req.body.time,
    start: req.body.start,
    End: req.body.end
  }

  const updatebyid = await Travel.findByIdAndUpdate(id, updateData)

  const updatebyid1 = await Passenger.findByIdAndUpdate(updatebyid.passenger_ID, updateData)

  res.redirect('../list')


}
admincontroller.deleteByid = async (req, res) => {
  const id = req.params.id
  console.log(id)
  const deletebyid = await Travel.findByIdAndDelete(id)
  const deletebyid1 = await Passenger.findByIdAndDelete( deletebyid.passenger_ID)


  // const deletedata = {
  //   delete:new Date()
  // }
  // const deletevalue  = await Travel.findByIdAndUpdate(id,deletedata)
  // const deletevalue1  = await Passenger.findByIdAndUpdate(deletevalue.passenger_ID,deletedata)
  res.redirect('../list')
}
admincontroller.searchData = async (req, res) => {
  const searchvalue = req.body.search

  const data = await Travel.find({
    $or: [
      { from: searchvalue },
      { To: searchvalue },
      { rupees: searchvalue }
      // { ticket_No: searchvalue },
      // { Ticket_time: searchvalue },
      // { start: searchvalue },
      // { End: searchvalue }

    ]
  })
  const passenger = await Promise.all(data.map(async (el, i) => await Passenger.findById(el.passenger_ID)))
  console.log("data", passenger)
  res.render('list', { data, passenger });
}


module.exports = admincontroller;
// const searchData = await permission.find({
//   permission_name: {
//     $regex: req.params.searchValue,
//     $options: "i",
//   },
// });