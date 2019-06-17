# frozen_string_literal: true

module V1
  class PaymentsController < ApplicationController
    AUD_HEADER = Warden::JWTAuth.config.aud_header.upcase.tr('-', '_').freeze
    AUD_FIELD = ENV["HTTP_#{AUD_HEADER}"]

    include AdminAuthorizable

    before_action :authenticate_from_params!
    before_action :authorize_admin!

    def export
      sheets = ExpenseSheet.includes(:user).ready_for_payment
      render plain: PainGenerationService.new(sheets).generate_pain.to_xml('pain.001.001.03.ch.02'), content_type: :xml
    end

    private

    def authenticate_from_params!
      user = Warden::JWTAuth::UserDecoder.new.call(token, :user, AUD_FIELD)
      sign_in :user, user
    rescue JWT::DecodeError
      raise AuthorizationError
    end

    def token
      params.require(:token)
    end
  end
end