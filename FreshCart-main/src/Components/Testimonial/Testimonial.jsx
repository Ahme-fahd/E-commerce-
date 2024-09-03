import Slider from "react-slick"; // Make sure to import Slider
import photo1 from '../../assets/testmonial-1.avif'
import photo2 from '../../assets/testmonial-2.avif'

const testimonials = [
  {
    text: "FreshCart has transformed my online store. The interface is user-friendly, and the features are robust. Highly recommend!",
    name: "Sarah Johnson",
    position: "E-commerce Entrepreneur",
    image: photo1, // Replace with real customer images
  },
  {
    text: "The customer support from FreshCart is top-notch. They helped me set up my store quickly and efficiently.",
    name: "Michael Smith",
    position: "Small Business Owner",
    image: photo2, // Replace with real customer images
  },
  // Add more testimonials as needed
];

const settings = {
  // Add your Slider settings here
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-950 overflow-hidden">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 text-center">
        What Our Clients Say
      </h2>
      <Slider {...settings}>
        {testimonials.map((testimonial, index) => (
          <div key={index} className="flex items-center justify-center px-4 sm:px-8">
            <div className="max-w-xs sm:max-w-md mx-auto rounded-3xl p-px bg-gradient-to-b from-green-300 to-blue-300 dark:from-green-800 dark:to-blue-800">
              <div className="rounded-[calc(1.5rem-1px)] p-6 sm:p-10 bg-white dark:bg-gray-900">
                <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300">
                  {testimonial.text}
                </p>
                <div className="mt-6 sm:mt-8 flex gap-4 items-center">
                  <img
                    className="h-10 w-10 object-cover sm:h-12 sm:w-12 rounded-full"
                    src={testimonial.image}
                    alt={testimonial.name}
                  />
                  <div>
                    <h3 className="text-base sm:text-lg font-medium text-gray-700 dark:text-white">
                      {testimonial.name}
                    </h3>
                    <span className="text-xs sm:text-sm tracking-wide text-gray-600 dark:text-gray-400">
                      {testimonial.position}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default TestimonialsSection;
