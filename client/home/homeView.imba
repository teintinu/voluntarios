tag homeView
  prop state
  def render
    <self>
      <div> 'viewHome'  + state['msg']
      <button :tap='mudar'> 'mudar'

  def mudar
    state['msg'] = 'mudou'
