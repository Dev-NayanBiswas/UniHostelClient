function AvatarHeading({avatarData}) {
  return (
    <section className="my-2 flex gap-5 mb-7">
    <div className="avatar">
      <div className="w-12 rounded-full ring-2 ring-logo-yellow">
        <img src={avatarData?.photoURL} className=""/>
      </div>
    </div>
    <div className=" text-gray-400">
      <div className="flex justify-start items-center gap-2">
      <div>
        <p className="font-semibold font-heading">Distributor</p>
        <p className="font-semibold font-heading">Email</p>
      </div>
      <div>
        <p>:</p>
        <p>:</p>
      </div>
      <div>
        <p>{avatarData?.displayName}</p>
        <p>{avatarData?.email}</p>
      </div>
      </div>
    </div>
    </section>
  )
}

export default AvatarHeading