import React from 'react'
import HeadingTitle from '../HeadingTitle/HeadingTitle'

function FAQ() {
  return (
    <>
    <HeadingTitle headingData={{heading:"FAQ"}}/>
    <section className="space-y-3">
    {
        faqItems.map((item, index)=><FAQTabs key={index} item={item}/>)
    }
    </section>
    </>
  )
}

export default FAQ

const FAQTabs = ({item}) =>{
    const {question, answer} = item || {};
    return (
        <div className="join join-vertical w-full !text-logo-yellow">
  <div className="collapse collapse-arrow join-item border-2 border-logo-yellow/45">
    <input type="radio" name="my-accordion-4" defaultChecked />
    <div className="collapse-title text-xl font-medium">{question}</div>
    <div className="collapse-content">
      <p>{answer}</p>
    </div>
  </div>
</div>
    )
}


const faqItems = [
    {
        question : "How does the payment system work for meals?",
        answer : "We offer two flexible payment options: a monthly subscription and meal packages. The monthly plan provides unlimited access to meals throughout the month, while meal packages allow you to purchase a set number of meals in advance, which you can use as needed."
    },
    {
        question : "What types of meal plans are available?",
        answer : "Our meal plans include breakfast, lunch, and dinner, catering to different dietary preferences. You can choose between a full-month meal plan or select meal packages based on your schedule and requirements."
    },
    {
        question : "How can I make a payment for my meals?",
        answer : "Payments can be made through online banking, mobile payment apps, or directly at the hostel’s admin office. We accept multiple payment methods to ensure convenience for all students."
    },
    {
        question : "Can I customize my meal plan or skip certain meals?",
        answer : "Yes! If you choose a meal package, you can decide when to use your meals. However, for monthly subscribers, meals are served daily, and skipping meals will not lead to refunds or rollovers."
    },
    {
        question : "What happens if I miss a meal or have a class during meal hours?",
        answer : "We offer takeaway options for students who are unable to dine in during meal times. You can pre-order your meal through our app or notify the staff in advance for a hassle-free experience."
    },
]