import { WARNA } from '@/module/_global'
import t from 'react-simple-toasts'

type Event = "error" | "success" | "info" | "warning"
export const toast = (message: string, event?: Event) => {
    t(message, {
        position: "center",
        render: (message) => <div style={{
            padding: 12,
            paddingLeft: 24,
            paddingRight: 24,
            borderRadius: "100px",
            backgroundColor: event === "error" ? "red" : event === "success" ? "green" : event === "warning" ? "orange" : WARNA.biruTua,
            color: "white",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
        }}>
            <div >{message?.toString()}</div>
        </div>,
    })
}