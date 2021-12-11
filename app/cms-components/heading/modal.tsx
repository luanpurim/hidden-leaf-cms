import ReactDOM from 'react-dom'
import Input from '~/components/input'
import Label from '~/components/label'

function HeadingPropsModal({ data, setData }) {
  return (
    <div className="w-screen h-screen fixed top-0 left-0 bg-black opacity-50 flex justify-center items-center">
      <div className="max-w-screen-sm max-h-screen p-8 grid">
        <Label htmlFor="heading-content" />
        <Input
          type="text"
          id="heading-content"
          name="heading-content"
          onChange={(event) => setData(event.target.value)}
          value={data ?? ''}
        />
      </div>
    </div>
  )
}

export default function RenderHeadingPropsModal(props) {
  return ReactDOM.createPortal(
    <HeadingPropsModal {...props} />,
    document.querySelector('#modal-portal')
  )
}
