import React from 'react'

const Accordian = () => {
    return (
        <div className='my-14'>
            <div className='md:w-8/12 mx-auto text-center'>
                <h1 className='text-2xl font-bold text-secondary my-5'>Frequently Asked Question (FAQ)</h1>
                <p className='text-accent mb-10'>Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!</p>
            </div>

            <details className="collapse collapse-arrow bg-[#E6F2F3] border-secondary border-2 shadow-2xl mb-4" name="my-accordion-det-1" open>
                <summary className="collapse-title font-semibold">How does this posture corrector work?</summary>
                <div className="collapse-content text-sm  border-t-2 border-t-secondary border-dashed pt-2">A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here’s how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders.</div>
            </details>
            <details className="collapse collapse-arrow bg-[#E6F2F3] border-secondary border-2 shadow-2xl mb-4" name="my-accordion-det-1" open>
                <summary className="collapse-title font-semibold">How does this posture corrector work?</summary>
                <div className="collapse-content text-sm  border-t-2 border-t-secondary border-dashed pt-2">A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here’s how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders.</div>
            </details>
            <details className="collapse collapse-arrow bg-[#E6F2F3] border-secondary border-2 shadow-2xl mb-4" name="my-accordion-det-1" open>
                <summary className="collapse-title font-semibold">How does this posture corrector work?</summary>
                <div className="collapse-content text-sm  border-t-2 border-t-secondary border-dashed pt-2">A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here’s how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders.</div>
            </details>
            <details className="collapse collapse-arrow bg-[#E6F2F3] border-secondary border-2 shadow-2xl mb-4" name="my-accordion-det-1" open>
                <summary className="collapse-title font-semibold">How does this posture corrector work?</summary>
                <div className="collapse-content text-sm  border-t-2 border-t-secondary border-dashed pt-2">A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here’s how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders.</div>
            </details>
            <details className="collapse collapse-arrow bg-[#E6F2F3] border-secondary border-2 shadow-2xl" name="my-accordion-det-1" open>
                <summary className="collapse-title font-semibold">How does this posture corrector work?</summary>
                <div className="collapse-content text-sm  border-t-2 border-t-secondary border-dashed pt-2">A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here’s how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders.</div>
            </details>
        </div>
    )
}

export default Accordian