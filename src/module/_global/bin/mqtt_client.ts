import mtqq from 'mqtt'

declare global {
   var mtqq_client: mtqq.MqttClient
}

const mtqq_client = globalThis.mtqq_client ?? mtqq.connect("wss://io.wibudev.com")

export default mtqq_client