const statsData = [
  {
    title: 'Earnings',
    value: '$93,438.78',
    description: 'Monthly revenue',
    color: 'text-pink-500',
    icon: <span className="text-2xl text-pink-500">$</span>,
  },
  {
    title: 'Orders',
    value: '42,339',
    description: '35+ New Sales',
    color: 'text-yellow-500',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-6 w-6 text-yellow-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 3.75V6a3 3 0 003 3h12a3 3 0 003-3V3.75M3 3.75h18M3 3.75A3 3 0 006 0.75h12a3 3 0 013 3v2.25M4.5 12.75h15M7.5 12.75V15a4.5 4.5 0 119 0v-2.25"
        />
      </svg>
    ),
  },
  {
    title: 'Customer',
    value: '39,354',
    description: '30+ new in 2 days',
    color: 'text-blue-500',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-6 w-6 text-blue-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18 10c0 4-3 7.5-6.75 7.5S4.5 14 4.5 10 8.25 2.5 12 2.5 18 6 18 10zM7.38 16.5a8.974 8.974 0 00-2.38 6.75V24h14.25v-1.75c0-2.75-1.25-5-2.38-6.75a8.959 8.959 0 00-4.12 0"
        />
      </svg>
    ),
  },
];

const Dashboard = () => {
  return (
    <div className="bg-gray-50">
      {/* Header */}
      <div className="mb-6 flex flex-col items-center justify-between rounded-lg bg-white p-6 shadow-md sm:flex-row">
        <div className="flex items-center">
          <div className="mr-4">
            <img
              src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUQEhMVFhUVFRcXGBYVFxUXFRUWFxYWFhcZGBgYHSggGBolHRUVITIhJSkrLi4uFyAzODMtNygtLisBCgoKDg0OGxAQGy0mICUtLS0tLS0tLS0tLS0tLS0tLS0vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAIcBdAMBEQACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABAYDBQcBAgj/xABGEAABBAAEAgcECQIEAgsBAAABAAIDEQQSITEFQQYTIlFhcYGRobHBBxQjMkJystHwUuE0YnPxJIIzQ1Njg5KToqOzwhX/xAAbAQEAAwEBAQEAAAAAAAAAAAAAAwQFAgEGB//EADQRAAICAQMCBAMHBAIDAAAAAAABAgMRBBIhMUEFIlFxEzJhM4GRobHR8BQjweFCciRS8f/aAAwDAQACEQMRAD8A64ui8EB4gMscRPkobL1HhdSOU8EhrQNlSlJyeWQNtnq5PAgCAIAgCA+mstS11OXPY8yZQKVyMVFYR4eroBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAfL2g6FM4PHFPqRJsORqNR71IpZK06muhgXREEAQBAEAQHijN0NF7LyUlFZZ42kSI4QN1SsvcuF0IJTz0MqgIwgCAIAgCAID7ygalWa6ccyPMmqwnH2yYh2Ha3Ruma9Cas0OVba+HeF1G9Oe1EsqWobmbpWCEIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIDHiJgxpe7ZoJPoh7GLk0kV+fjb/tH6Nji++dCS87RtvTNtZ2F14qTYaNeji9sespdPb1f+ETOE8WL3CGUASdWyTTbt5jl15gNXLRWvoUPNB+XLX4dzYy4cHUaFFLBRnUnyiI9pGhUieSs00+T5Q8CAIAgPqOInyVWy6MenU2ZTSJLWgbKlKbk8shbbPVychAYcJi45W543te2yLaQRY3Gi9aa6npmXh4EAQHoC6jFyeEDI1lK5XUo+54yFxzEhkTiTWnPw/leq41M1GGPUkog5zSRrui/D2UcSGFpkJcMxBNON3Y2GpoeJ71HpaXFbmS6mzL2+hYVcKoQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQEDjhqK+58RPkJWE/BerqS0/OimCZpbBE80xjPrM5Oxc+3AH2+9duXc2XJxc5rq/JH2R70bnfiMZ11HtOMrh/REGPjiB7i4vJr/KSuW+xU1TjCtQXRcff1Z0ALkzDx7Ad0TweSimsMhzQEeIUikmVZ1OPQwrojCAICYsY0QgCA1XSrFGLCTyDcRkDzd2R+pd1LM0SV/Mip/Q493UTtOwlBHqCP8A8hTalco5fKyWTpB0twmDIZM8l52jjGd+12QNhXeq+D2MW+h9dGelGHxzXGEuDmGnMeA17RyNAnsmjr4EbrzDEoOPU3rWWpa6nL2OGzKBSuRiorCOSLxHGtiYXn05D1PIeK5ssUFlnUIObwivzQOxckbXElmkj9KsfhbXIbqjVuvs3S6IutqiDS6lqaK0WkUD1AEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAfEsrWi3EAd5IA965lJRWWz1Jt4RH4m8dWQRmDtK7wd69LK8lNRWTqtPdwVDD9EjNd4g9XmBI6unOLQA0Os0coAA0IuzRXSmpLKLctVKPbktnCeHxQsyxDc25125zu9x5n4DQaImn0Kk5Sk/MTl6cBAEBHmw96jQrpSIZ1J9CI5pGhUieSu011PEPCYsY0QgCA1fSjBumwk0TBbnM0A3JaQ4D1ql3W8STO4PDNX9HfDjFhS5wIM0jn0dwNGt/Tf/Mu75ZkeSW3j0KHhYJH8TnxD+reTNIwxl32gDH5WigOyCGtGtAjL5KvJ8Mu1LjBb8Fioji4ZWsc0m256oOB0cLvVoI18Wg8rXmn+ba+guqexv0N4/jmdz+re1rGbuoEuA3cCdAwai6PftV2tRdOrCSK1dO5ZZpB0vkJLBmLTo0tYOtefLZvsvyUT1U8diwtEsZbPME2TFSZZcPLVgjM00K1uSR511H3WqJQtt5TydN11Lhl1wWGDG1uTufkPALRqqVccIz5zcnlkhSnIQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQEXiOBZMzq5BbbvQkbeIUVtMLY7ZrKJK7ZVvMWZJcO1wDTy2rkupQUlhnKk08nscWVoaF7GKSweN5eT5wuGEYIF6mzZvlXySMVHoJSb6mLiOJLGityaG189gSLOmwvyUWoscI8d/5/OpLTXvlyajDcYcJmRl2bO7LXMGr7gQe8EA+FaqtRdJyw3/AD+fRexPdTFRyv5/PdliC0CkeoD4kjB3XqeDmUVLqRnYU8l3vK7pfYyLILgQBAAh6QOAD/h4q2yCl24uUsI9l1K5016HwySNx7Zvq87CLdQLZeQa4aHMdgQb20NBWFQtvJ3VZLOEsmoxWLBbHG+iQS5rALc4m702DRZrkNLOgXtGmUHufUtN5PC/O1wBGYAg0bokatJ8QaKntrU44Z4uHks3Q7hERiExBzEuaQdAAHEVQ8lUq00cZkuTjU6iTltXQtTGACgAANgNArZSPpAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQGPEZspyVmo5c15b5XXJD2OM89DXcYjc6Gi4NfpZFlubasv4gSaryUF6UltJapbJZRF4L0cET+ukf1kgFDSmtHgP5VmgLSqhQ5Z7be58G/U5AEAQBAR1mHQQBAfE5IY53c0n2AlS1VuT+gNT0Akc7h+HL/AL2Qg+j3Ae4BX5xjGTSOrfneCm/ShxGQzBl0yMdkHZzyBmd4kA0PXvVSclKxQfQ1dDBQqdi+ZlNgxshaQ14aHaOfmt7gOQIF1rsNuVbKZzVcsZJfh/FjlJe/qWbh2LibGGx2KGgpxJPkAXHx0UkbIyK1lEocstn0c8ZbO2VgsOY4FzSbo1RojQjQfsF1Io3rnJc1yQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAeEID1AEAQBAEBHWYdBAfbY+9WK6O8jzJqemL3NwkjmgnLRcALJYPvCuf8AZWJQlJbYdT2DinmRpOhPFSzB29rhq50baJsFz3AB3j3mhr3LiycabJVylnBLKG9KUF1RqelMLS9uckvk7TzyAGzWDkNHVz0VGtu63L4L9TcIcdih20tH2YDDtq0PAB3cz7w/3V2dMuql+PJbr1EH5ZRWPpwYcS0AtGYkDk8Xpzqx5c6UcZNc7fwJZxjnG7PuWX6LOJluNyHaS2nfuJbz7wFacuEZl8N0JfQ7SvTMCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAAoAgIGMxuSRjOR39dApYV7otkU7NskieoiUIAgCAIAgCAIAgCAIAgI4CzYxbeEdGVrKVyupR5Z42famPCPi8S1gF6lzg1o5ucbPuAJPcAUBoeM8De4O6trZGPJLo3nKWk843cvI7eWipXaVye6HUuUahLiX4mkxnRyVmHlmlJdIA0RtLgS3UCy7bNrQrb10k09GzmXU6nqcySh0/U5XO4ROIc8Op1OyCQgG9RYFXfitSFTfL6feSqyGcMN4jGNeuLa5Pa8tHkS0j4KK3TxZYhNw5i/2N70eaGYmGZhBBkYRkIN9sbDx+ap2bopRfqSNRlGb6ZTO7hTGAeoAgCAh4vHhhqrPdt71JCtyIp2qPB9YTGNf4HmO71XkoOJ7CxSJS4JAgCAIAgCAIAgCAIAgCAIAgCAIAgI+C+7/AMz/ANbl1LqcQ6EhcnZVOMTEzO8KA9AFo0R8iKF0vOyz4d+ZrXd4B9oWfJYbRdi8oyLw6CAIAgCAIDBjpskb39zSfXku647pJHE5Yi2VPBcRkEjSXuNuANkkEE9y0rKYuDWDPrtluTyXK1lGmeoAgPA2lzGCiuAeroBAc76SdIHl5nicQ0PfDC8UR9k4NxD6I1uTsDwhJH3ld0VEbJNy6IzfEtTKqKUHhvuWzorxM4jDtkdeYdhxNdpzQLdp3qHU1fDscUWNHe7qlJ9SVxyHPh5m3Vxuo9xykg+hAKgXUtp4Z+W8NxfqmiB7ey22uI37uWmn7Lb0s8RcX8p7qYrduT5JmCx4JLM1kasdzIvY+I5+S64cnB/cTU6iUIqXbuizcK41ldkIDXMIcK2J3afDUe5UbaMSwjSjOF0Gkd6wkoexrxs5rXDyIBVBmK1jgzIAgMOL+478p+C6j8yOZ/KytZlewZ+TwuTAyWqPYeQWe+porofSHoQBAEAQBAEAQBAEAQBAEAQBAeICNw14LNP63/rcu5pp8kdbyj3iGL6phfV0Rp5mkrhvltFk9kclQxmJzvc+qzG6WpXDbFIzpz3NssHBuKh5EWUimb33UFRvocFuyXKbt3lwbhViyEAQBAEB4SgZTOOcQbK8OZdZQNdNbK1tNTKC8xl6ixTllGpdIraiRG76L8Qa15jdmJkLQO4Ve+viqWspbW5di1prEnh9y3rLL4QBAEBoOnHF34bCPfFrM8iKEf8Aeydlp8m6vPg0r2Ky0jmUtqbZzGbHOdFDAcuSBmRlCjVAW43qTlBvvtfQU6eFXynyuo1U7/n7E/hfSbEYaPq4smWy7tNs2d9bXlulrtlulk6p11tMdsMY9i8dMcfIzhsr2V1skORl0BnkbV66aAk+iwuFPnpk+pqTml9T80sn6sGKZltu9bzNdsSLWvp7YtNS5ySaiL4cV0I/UuDS8AlgJaHHayPjShlw+OiJ6+yfVo3IxwcWSt3oRSN8HbH2qe2MZxjNezIqZyhOUM4fY/UXDXtdFGWfdLG5fLKKWLJYeGRZzySV4AgMGN/6N/5T8F1D5kcz+VlXzLQwZp4XJgZLdFsPILOfU049D0leHpoeP9KY8I9sbmOcXNzW3LW5HM+Ct6fSSuTaaRR1WvhRJJpv2wa1v0gwkgdTLr+T91M/DZpZ3IrLxetvG1/l+5cAVnGuj1AEAQBAEBG4hihEwv35AeJ2XdcN8sEdk9kcmowHHHF4a8CnGtBRBOytW6ZKOYlavUtyxIk8Q42I3ZGtzEb61R7lHVpnNZbwSW6lQeFyTsBjBKwPHkR3HmFDZBwlhktdinHKJK4JAgMGOmyRvf3NJ9eS6hHdJI4slti2aforPYezuId7dD8PerWshhplbSSymjL0mxLRGY77RogeAOq50kG57ux1qZpR29ypl61cGebHo/i2MlzPcAMpFnvJFKvqq5ShiKJ9PNRnyXQLINM9QBAEAQEbiGMjhjdJI4NaNyfHQDxPgu665TkoxWWR22RhByk8I5jBxFkmjTr3EUV9G6ZRXJhwuhN8MyFyYJck3gL/APiYvzj5qHVL+zIlp+0R0ZfPmsEBC4djTJmsAVW3jf7KWyvYRVWOeSaoiUpHG3fWeIOZ/wBXgMK+V3d9YxDHMj9WxCQ/+IF3X869yO77OXsc/b/KX0zwllnx6TfCNriuASshEpdHqPuZxnaLAs3QoWLINC1ny8Soj82UjSXhGokvLhv0LrjsYJoIo2AOGaOyCHCmUXXXKhXqvl9Rqo2KSSZ9ZRROprd2RXuP8BgltoiBYBbi7VuY6MYy9cxJF0dFW08rFNKD5Lk7Fsbs5RWuM9C4Y8PFCHSZetlkeQW9olsbWtBO1Bl7d/mt++yVS3TM7SWqyx7PzNNjPo9lYczGzBvcWhx0N6lu/sXlHiVDajKTS9ixZVJ5kkm/c7N0FLuoYHXbYoxRBGoBB0O2oUuqw3lGTTlSkmWZVCyEBE4pLlice8V7dPmpKo5mkRXSxBlVzLRwZuTwuTAybnimMcI4nNJbmB2PgFVprTlJMt3TajFoiy8Xc5nVkDUVet+alWnSluRFLUNx2s59xvFF8rgQOwS0V3Bx38Vr0w2xMHUWOU+exBY6jfcpGsogzh5OxdGeIOxGHZM8AOdmsNutHEcye5fN6mtV2OKPrNHc7aVORtFAWggKb0k6Zvw87oY42ODQLLifvEXWngQtLTaBW175PBkavxJ02OEYp4Nv0U459biL3NDXNeWuAJrYEHXwPuKravT/AAJ7V0Lei1X9RDc1hm7VYuFb6UykOa2zRbdcrtX9HFYbKGrk8pGibIRqNwru3JTzgPlJJJNk7koopLCDeeWbroviXZzH+Gi717I3VPWQW3d3Lekm923sWdZ5oGi6X8afhIRIxocS8N7V0LBNmvy16q3o9PG+zbJ44Ket1EqIborPJExvFHS4GOUtymWrA25nTwOW/VS1UKGocU84I5XOzTqbWMkPoziKnA/qa4ewZvkptZDNeSPSzxMh8UxvWyufyuh+Ubfv6qairZBIius3zbIJerCRxk+XPTaMl+6PYzrYGuO47J8x/alhamv4djRrUT3QTNkoCY1vSDiwwsXW5S4lzWtYN3Ocaod5qz6KfT0O6e3OPV+hBqL1TDdjP0MvCMXJLGJJYjE432CbIF6E6CiRrS5uhGE9sZZXqdUzlOG6UcP0JqiJTlP0h8ZM2I6hp+zh08DJ+I+m3tX0nhemUK976v8AQ+d8S1G+zYui/UqscpaQ4bhabjlYM5Np5RY4cQHNDhzCpyhh4NKMtyySOH45kMrJnmmsNmtTsdAOZUd1UrK3CPVk1dsYSUpdix8E+kCKeYQvjMWY0xxcHAnkHaDKT6hZuo8Jsqr3p5x1LNHiMLJ7WsehcQso0iqdEuOxSOe28h7AAeWguJzaN11V/WaecEn1MzRaqE2109y1OcALOgGp8AqBplK6HRl+CxOOd97Gvmn136ogsgH/AKbG+1d1/Ovciu+zl7M0HBcHGwRSSRve59Forsgkdm/aNN/IEA2tXqZzk4p8FTQ6SFcFNrzMn8U4vBh5mlgc9zIyx4Iy1IXAkk+lUBpQ9KcvDLtTFSi0l9S1LxWjTNwllv6dvzNnG2WMdYMKxgky9oSMANjs3Q3WVLRW5wzVjqKpRTy/wJPEoXhoc7K0NczPXay5tASdNiQfUFTU1vTZs4bILGr/ACZwjV4ngYnjuSxKGkBwPYs3VAbjXzUdviN1icG1tfbH8Z7VoaarFYuq+r/+GxxeNMURe4atjzHuBrQXzJdQVbT1O22MF3ZNqLI11Sm+yOf8PxRZLG9znU17HOonUBwJ056Wv0OdacHFLtg/P4WtTUm++TsHC+KRYhofGdCLoiiBdahfN20zreJH1dN8LVmJOUZMa7jx+xd5t+IU2n+0RBqfs2VXMtPBmZGZMDJs+KH7GD8p+AVahf3JFm5/24lZ4zxIxBuWi5x59w/gV+qrf1M3UXutLHUrE0pc4uO7iSa2sm1eUcLBmSlueTGvTwtnRPpU+IxYZwZ1Wai6jmGckg3dVZHLZZ2r0UZqVi6mpotfKtxreNp0wLCPoz1AcO4jOZJZHu3c9xPtK+rqgowSXofF3ScrJN+pafoznInlj/C6PMR4tcAP1FZ/isVsjL6mn4PJ/ElH6HRyViH0JReJ8W692rDG+O2vY7UtN2NRuCFs0UfDXXKfRmLdqFa+mGuGjWYvFiNuZ3kANyVahByeEQTsUFlnmFxQkaHC9eR3CShteBCxTWUb3orIBMbIHYO/m1Utan8P7y5o35/uN70g45HhIusfqToxo3efkO8qhptNO+e2P3/QuanUwohul9xzPj/SXE4kGKUBjQ4OyBpBGmlk6819DptFVV5ocv1PntTrbbltnwvQ2OG6SGaCPCuYGmICnNOjg1uXbkdRzUL0Xw7HYn1LMNZ8StVNYwSuFYoRytcQSNRp/mBb81xfW5waRNVPbLLNS/HgSCOjZrXlrsrSqbjuK0rUp7TO565SJUyBjMaWvY0VqdfIkAfzwU0K8psjnY4ySRdODY8wYCWYNLixziB6N1PgNz4ArG1NSs1UYN4zg0q7XXp5TS6Efol0scYZpMW8ZY3NAfWpL7OUNaNSKG3IrvW6BKyMaVy10/yQ6PXN1ylc+nf/AATODZsdiBjXBzYYrEDXbucRTpCPcP7KG/Gmr+CvmfzP/BNRnUWfGfyr5V/ktgWcaJE4rixDDJMfwMc72DT3qSqt2TUF3ZHdPZBy9Dg8khcS5xskkk95Jsr7WMVFYR8g228s+bXWAbLhM+hb3G/Q/wC3vUNseclqiXGDDxXEWQ3kNfU/2+K6qj3PLpZeDXlT4IDtvQ3i31nCRyE9sdh/526E+oo+q+M12n+De49uq9mfUaS74tSk+vc5l0d/xUH+qz9QW1qfsZex83pfto+50rp5iHMwE4YafK0QMPPrJ3NgZ75AV80fWkyXBthwhhYKZHAWNHc1seUe4Luv517kV32cvZnKpOkU/UswpkAZVAAU5wA2Lt6Aru5Wt3+jpVm58t9j53+uvlVsXCXddfxz+hr5CTZOpN76kq3GKXCKE5N8vk6vxB2aDDhuoJZZGurQK1Hjovlp/M/c+zr+RexTukMuKbLMBKRHlc5xaSQ6XO1rmnbRoto8Gm7VvSUbpptcFPW37a2ovlfcV7DYuSM2x7m+FmvYtC/wrS3dY49uP9fkZVHi+rp6TyvSXP8Av8yTi+Mzyt6uR9tsGqA2213XOk8J0+mnvjlv6v8A0hq/Fb9THZLCX0T/AMtkBaZmF16M4jIyJxuhqa5iyszUw3bkbOjntUWdDBWIbqNd0iP2DvNv6gp9N9oiDVfZsqGZauDKyeZ17gZNtxY/YYf8p+DVUoX9yZav+ygUfpEftG/l+ZWtp15TF1b8yNUrBUCA9C5l8rPY9UdO4j03hhkfC6KQlhokZKOnKz4rCr8OnZFTTXJ9FZ4pXVJwcXx7fuQeL4zrHtkbYD42OAO4zC+Sn01e2Li+zZFqbN0ty7o5+/c+ZWwlwYUurLX9Gn+Kf/on9bFm+K/ZL3NTwj7V+x01YJ9GUH6QIC2Vk0Qp5ZTqH3gCasc6W14ZLMHGXTJh+JwcZqcOuCn4viBkblc0WCDfiPBasalF5TMmdzmsNGXA8SaxoYWnzFanyXk6XJ5JKr1FYwSBxRrtGtcT5D91x8FrqyZXqXCTLV0ZgONnfisQwgQ5Y4mHWMEXmcCfvGx7/AVlauS09aqrfXlvv/o0tLF6ix22Lpwl2Kb0uxGfGzuG2fL/AOUBh97StfQw26eK+hla2W6+T+pEwDsjmP5Otvkb/wBvapprcmiOrytM3sEnab+YfEKrKPlZeXU0PE8Rcmgot0vv5hWqoeXkpXy8/Bnw8kzmg5xXiAT3dy8lGCfQ7h8WSzkSYXsEWS465juSNvIIpc/QklX5fqQ52zsYMxeGOLgO0S1xFZhQNcwpI/ClLjGV9OSCSsjHnOH9TJwTDCXEQxO2fI0HyvUeotc6mbrqlJdUjmiCnbGL7s7nGwNAa0AACgBoAAvi223ln16SSwj4jxLHGmuaSOQIJ9y6cZJZaPFKL6Mrf0k4nJgnD+t7Ge/Mf0rQ8Khu1K+mWUvEpYoa9eDkRK+rwfNnyXL3B6SOHyU/zB/dc2RyiWp4kYJZLJPeV3GOEcSeXkxly9SPEibw7js8DSyJ+UF2YjxoD4NCgu0dVst01yWK7pVrETa9HP8AFQf6rP1BZuqX9mXsR6X7aPudM6SsL5cFCNjiusf+WGGWQf8AyCJfMH1pseNSBuHmc4gARSEk7ABhJK6g8STI7U3BpehwPCvytM8vZLgDR/Az8LK7+/vcT4L6aHCdk+/5Lsv53Pl7Fuaqr6L833f87H01j5e1JbW1pFzPjIef5du++RRlPmXC9P3/AGOZSjUsQ5fr+37nbuF4qOWFrG6FkbDoKogaV6hfPXUuE+ejZ9LTcpw46pFB6QSkRgA/ecc3O+Zsnx1W3poJPHoYessk4+5XFewZoTACYBaeFO+xZ5H4lULV5malHyI6ezZfPPqfRR6Gh6ScSZldBrm7PLTk7dXtJTLKn2KWrujhw7lYzLSwZuTzMmDzJLxfEM8cceWurFXe+3s2UVdOyTlnqS2X74qOOhVuPntt/L8ytChcGXqX5kaxTYKwTB4Ewe5wZcTO6Rxe85nONknmfReQgoLC6Hs5ubcpPlllbiS5sZPKNjfRrQFSVe1v3Zp/E3RT+hVX7nzKvroZj6ll+jvEtZiiHfijLR5lzf2Wf4nXKVKx2eTS8Kmo3c90dUXzp9Mc+6TTOOIeCSQ0gC+QoHRbuiilSmjD1cm7WmU/ig+0PkPgtWr5TIu+c+ME1pdThdjTz/lr2eccHlO1ywzZRQsZZaKtQtuXUuRjGPQ6XxLizcNDG9zS7NlbQIH4b5+S+cp07vscU8H0Flyqgm0ce4tiutnllr773OruBK+ror+HVGPoj5e6e+yUvqMO77Nw/wAw13y7a+5dSXmOofI0ZI+IObJmzAtFHXQGq28TquXUnHB6rWpZzwR8WHOJkLaBpdwSS2nFibe7Bm4bifwHzH7LyyHckpn/AMSZmUeCy2SuMuH/APPi7/rT/wD6xfyVelf+XL/qv1Go508f+xpOCzZcRC7uljP/ALwrmphupkvo/wBCnQ8WRf1R0fp5xUgMhjeKdmL8pHKgGmuWp9i+f8L0+W5yXTobmvu4UYspcWILCHNJa4agjQgrblWpLEuhlqTi8o3XTPj7cRhWw5T1jerkLhWS8naA1v8AEfYqHh+jlVc5545X16lvWalW1KOOeGUIuW7gyUfNrrB6ZsKNSe4H3hcyJILkj5l3g4wY3OXSR0keWvcHpYuFS5Zo3dzx8VjWw3QaOKXixMs5xcn1mF5e8tYyU/eO+eCvaM6y5URb6L8Daja13Nzx3jrJoJIjG7K5uuooga5T4GqPgSq8NDJSTyTWatOLWDlvVZnBztQ3UD/N/UfHkO7X03XDdLL7dD59WbY4Xfr+xmJUmCI6X0YxAaySyAeqFWQLNH2rC1kG5Rwu59BpJJRefQqnSE9hv5vktKhcsytU/KjRK0UgvTwICy8Md9kzy+ZVKxeZmlS/Ii9wcaH1brSWF4B7N1ZDq23WLLTP4uznHqba1KVW59fQq/EcZ1shkIq60u9gB8lqU1fDjtMq234knIi5lJgiyYnYoA5TfnRy+3ZdbH1OHYk8HjMSCaF+ZaQPaUcMBWJvBqeNntj8vzKsUrgq6h+ZGvUxXCAJg8CYBYMMew38o+Cqtcl+D8qK8RqfNWyk3yTuBylkudppwFg9xsd6ivgpxwyfTTcZZRbsB0nmbIDK9zma20NZZ0NchzpZtugrcWoLD+81atdYpZm8r7jW8XxolmfK0EBxBAO+wHyVjT1OutRZBfarLHJFe4me36D5q9WuDPu+Yj4Z3bb5qSS8pzX8yNs5ygwXskrHcXmla1kj8zWkECmiqFch3FRVaWuuW6K5+8lnfOaxJmn4DIwSkyAllFrgKstcHNNX5qxqYSlDEHyV9O4qbcuhh4a6g4eSlsXRnFPdGLDU2dvcJB+oL2azW/Y5jhWGXiMvZrvPw/gXlUSW58YIMMmVwJ5fspnHKIY8PklROLjnzFvcN9PG1w0lxgnSb8xs+KTtOAjZmGcYlxy3rlMdXXdYVSmEv6uUscbV+pNdJf06XfJruHMa2fDEuFF0TnGxTftNQe6gAp7XKVVix6pfgVoRSshz6P8AMmYyQGR5Gxe4jx7RXFcXsSfoiWb8z9zCXqTacnyXr3aDXzwDcaeCnizxw7owRR5ua7bwcRjklspooKPlkyWOCFiI9bG3cpo/U5cMdDFDGXODRVk1qQAPMnQDzXUpKKyzxRbeEZvq4Fg6kEiwdNO48x4rhTyso72JdTZYN32jPzD4rNmvKV6/mRYXcQY0dtwB8A4/JVFW30L7ujHqyNNxiItIBJsEbHmPFSKiS5IpamDWEaMKyUAh4bU8WeABkbtpdlQ/Bj6ln+okljB8cSkmLR1jQBeld9eZXtcYp8HNzsa8xABUuCsF4DwuXuB1JOFlcRXWlvICifguJRS7E8G+m7BPjw0v/bH3qNyj6EsoT/8AY+MUZYwD1hNmv5a9jtl2IbPiQ53HxBiJXGhIL7iP7L1wiuqOYzm+E/5+BmkE9Gy0ije23sXK+Gdv4uOwkxE7RbmtofzvXqhBnjnZFcog4rEF5BIA05ealhFR4IZzcuWYF0cBAEPMnqDJu8O7sN8h8FWkuS5F+VGkefirKRT7kjAHtabkf3+S5muCWp4kbAO71HgtZPkuTAya3Hu7QveuXmVPBcFe18mECpAO53zXf/E8j8xMmxbWmja4jBssSsSZ9Z7FheYO0yBgHfe9Pmppojr6sxYZ9OJ8CupRyjmDw2fDTfmSF61g4z+Jlx4NNPdofNeVks84WT5dEHHNeh5L1PCwdbU3k9knDdPgii2SblEx4qSw0jbX4r2EcNkVnY+Se0zyC6xwzx9UTM6iwd5PC5e4GTHJIukj1GJzl0kdZIsM1aKRxycReD7knF0iiS5R8517tPTDE7U+a7aOInkp1XiR6z//2Q==" // Thay thế bằng URL hình ảnh thực tế
              alt="Basket"
              className="h-24 w-24 rounded-lg object-cover shadow-md"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
              Welcome back! KTB Sport
            </h1>
            <p className="mt-1 text-gray-600">
              Sports play a vital role in improving physical health, boosting
              mental well-being, and fostering teamwork and discipline.
            </p>
          </div>
        </div>
        <button className="mt-4 rounded-lg bg-green-500 px-5 py-3 text-white transition hover:bg-green-600 sm:mt-0">
          Create Product
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className="rounded-lg bg-white p-6 shadow-md transition hover:shadow-lg"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-700">
                {stat.title}
              </h2>
              {stat.icon}
            </div>
            <div>
              <p className="text-4xl font-bold text-gray-800">{stat.value}</p>
              <p className="mt-1 text-gray-500">{stat.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
