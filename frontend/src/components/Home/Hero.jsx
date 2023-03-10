import styles from '../../style'
import { hero } from '../../assets'

const Hero = () => {
  return (
    <section className={`flex md:flex-row flex-col mt-20 sm:py-16 py-3 pr-5`}>
      <div
        className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}
      >
        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="flex-1 font-poppins font-semibold xl:text-[92px] ss:text-[72px] text-[42px] text-BlackOlive ss:leading-[100.8px] leading-[75px]">
            Reshaping Accessibilty in
            <br className="sm:block hidden" />{' '}
            <span className="bg-gradient-to-r from-AirForceBlue via-green-500 to-AirForceBlue inline-block text-transparent bg-clip-text">
              {' '}
              Education
            </span>{' '}
          </h1>
        </div>

        <h1 className="font-poppins font-semibold xl:text-[99px] ss:text-[68px] text-[42px] text-BlackOlive ss:leading-[100.8px] leading-[75px] w-full">
          through AI.
        </h1>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          We aim to bring accessibility in education by providing tools to help
          assist child to write, read and understand text at their own pace.
        </p>
      </div>

      <div
        className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}
      >
        <img
          src={hero}
          alt="kids"
          className="xl:w-[100%] w-[85%] relative z-[5]"
        />

        {/* gradient start */}
        {/* <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
        <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" />
        <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 Tomato__gradient" /> */}
        {/* gradient end */}
      </div>
    </section>
  )
}

export default Hero
