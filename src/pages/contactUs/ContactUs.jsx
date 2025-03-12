const ContactUs = () => {

	const handleContact = (e) => {
		e.preventDefault();
		const form = e.target;
		const name = form.name.value;
		const email = form.email.value;
		const subject = form.subject.value;
		const comments = form.comments.value;
		const postedMessage = {
		  name,
		  email,
		  subject,
		  comments,
		  timestamp: new Date().getTime(),
		};
		console.table(postedMessage);
	
		
	  };
  return (
    <div className="max-w-7xl mx-auto p-4 my-12">
      <div className="w-full sm:w-[500px] text-center mx-auto px-3 mb-10">
        <h2 className="text-2xl font-bold sm:text-3xl  text-center text-gray-900">
          Contact Us
        </h2>
        <p className="text-center text-[#99A5B9]">
          Just send us your questions or concerns by starting a message from the
          contact form and we will give you the help you need.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 justify-between gap-8 md:gap-x-10 my-5">
        <div className="">
          <iframe className="rounded-lg"
            src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d6030.418742494061!2d-111.34563870463673!3d26.01036670629853!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2smx!4v1471908546569"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
        {/* Form */}
        <div>
          <form onSubmit={handleContact} className="p-10 border border-gray-300 rounded-lg space-y-6">
            <h4 className="text-2xl font-semibold">Contact Us</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1">
                <input
                  type="text"
                  name="name"
                  className="p-3 border border-gray-300 outline-none w-full rounded-md"
				  placeholder="Enter your name*"
                  required
                />
              </div>

              <div className="space-y-1">
                <input
                  type="text"
                  name="email"
                  className="p-3 border border-gray-300 outline-none w-full rounded-md"
				  placeholder="Enter your email*"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <input
                type="text"
                name="subject"
                className="p-3 border border-gray-300 outline-none w-full rounded-md"
				placeholder="Subject"
                required
              />
            </div>

            <div className="space-y-1">
              <textarea
                rows={5}
                name="comments"
                className="p-3 border border-gray-300 outline-none w-full rounded-md"
				placeholder="Enter your message*"
                required
              ></textarea>
            </div>
            <div className="flex items-center space-x-3">
              <input type="checkbox" required />
              <p className="text-sm text-gray-700 font-light">
                I accepts all terms and conditions.
              </p>
            </div>
			<input type="submit" id="submit" name="send" className="py-3 px-10 bg-[#eff3f5] text-[#12A2E0] hover:text-white hover:bg-[#12A2E0] rounded-md font-semibold duration-300" value="Send Message"></input>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
